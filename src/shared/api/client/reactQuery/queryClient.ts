import { getErrorMessage } from "@/shared/api/client/errors/getErrorMessage";
import { isGlobalApiError } from "@/shared/api/client/errors/isGlobalApiError";
import { normalizeApiError } from "@/shared/api/client/errors/normalizeApiError";
import { useSnackbarStore } from "@/shared/components/snackbar";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

const handleGlobalError = (error: unknown) => {
  const apiError = normalizeApiError(error);

  if (!isGlobalApiError(apiError)) {
    return;
  }

  useSnackbarStore.getState().showSnackbar(getErrorMessage(apiError));
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleGlobalError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalError,
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1,
      refetchOnWindowFocus: false,
    },
  },
});
