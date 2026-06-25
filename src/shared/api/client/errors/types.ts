export type ApiErrorFields = Record<string, string>;

export interface ApiErrorResponse {
  code?: string;
  message?: string;
  fields?: ApiErrorFields;
}

export interface ApiError {
  status?: number;
  code: string;
  message?: string;
  fields?: ApiErrorFields;
}
