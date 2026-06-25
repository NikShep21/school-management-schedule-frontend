import type { ApiError } from "./types";

const globalApiErrorCodes = new Set([
  "NETWORK_ERROR",
  "INTERNAL_SERVER_ERROR",
  "BAD_GATEWAY",
  "SERVICE_UNAVAILABLE",
  "GATEWAY_TIMEOUT",
]);

export const isGlobalApiError = (error: ApiError): boolean => {
  return globalApiErrorCodes.has(error.code);
};
