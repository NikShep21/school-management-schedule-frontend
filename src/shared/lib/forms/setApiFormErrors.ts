import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";

import { getErrorMessage } from "@/shared/api/client/errors/getErrorMessage";
import { normalizeApiError } from "@/shared/api/client/errors/normalizeApiError";
import type { ApiError } from "@/shared/api/client/errors/types";

type ApiFieldToFormFieldMap<TFormValues extends FieldValues> = Record<
  string,
  FieldPath<TFormValues>
>;

type SetApiFormErrorsOptions<TFormValues extends FieldValues> = {
  apiFieldToFormFieldMap?: ApiFieldToFormFieldMap<TFormValues>;
  messages?: Record<string, string>;
  formErrorCodes?: string[];
};

const getFieldErrorMessage = (
  fieldErrorCode: string,
  messages?: Record<string, string>,
): string => {
  return getErrorMessage(
    {
      code: fieldErrorCode,
    },
    messages,
  );
};

export const setApiFormErrors = <TFormValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFormValues>,
  options: SetApiFormErrorsOptions<TFormValues> = {},
): ApiError => {
  const apiError = normalizeApiError(error);
  const fieldErrors = apiError.fields;

  if (fieldErrors) {
    Object.entries(fieldErrors).forEach(([apiFieldName, fieldErrorCode], index) => {
      const formFieldName =
        options.apiFieldToFormFieldMap?.[apiFieldName] ??
        (apiFieldName as FieldPath<TFormValues>);

      setError(
        formFieldName,
        {
          type: "server",
          message: getFieldErrorMessage(fieldErrorCode, options.messages),
        },
        {
          shouldFocus: index === 0,
        },
      );
    });

    return apiError;
  }

  const shouldSetRootError = options.formErrorCodes?.includes(apiError.code);

  if (shouldSetRootError) {
    setError("root.server", {
      type: "server",
      message: getErrorMessage(apiError, options.messages),
    });
  }

  return apiError;
};
