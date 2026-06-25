import axios from "axios";
import type { ApiError, ApiErrorResponse } from "./types";

const serverErrorCodeByStatus: Record<number, string> = {
  500: "INTERNAL_SERVER_ERROR",
  502: "BAD_GATEWAY",
  503: "SERVICE_UNAVAILABLE",
  504: "GATEWAY_TIMEOUT",
};

const isApiErrorResponse = (data: unknown): data is ApiErrorResponse => {
  return typeof data === "object" && data !== null;
};

const getFallbackCodeByStatus = (status: number): string => {
  return serverErrorCodeByStatus[status] ?? "API_ERROR";
};

export const normalizeApiError = (error: unknown): ApiError => {
  if (!axios.isAxiosError(error)) {
    return {
      code: "API_ERROR",
    };
  }

  if (!error.response) {
    return {
      code: "NETWORK_ERROR",
      message: error.message,
    };
  }

  const { status, data } = error.response;
  const fallbackCode = getFallbackCodeByStatus(status);

  if (!isApiErrorResponse(data)) {
    return {
      status,
      code: fallbackCode,
    };
  }

  return {
    status,
    code: data.code ?? fallbackCode,
    message: data.message,
    fields: data.fields,
  };
};
