import type { ApiError } from "./types";
import { commonApiErrorMessages } from "./errorMessages";

export const getErrorMessage = (
  error: ApiError,
  overrides?: Record<string, string>,
): string => {
  return (
    overrides?.[error.code] ??
    commonApiErrorMessages[error.code] ??
    error.message ??
    commonApiErrorMessages.API_ERROR
  );
};
