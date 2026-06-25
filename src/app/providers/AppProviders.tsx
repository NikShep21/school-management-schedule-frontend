import { AppBreakpointProvider } from "@/app/providers/AppBreakpointProvider";
import { queryClient } from "@/shared/api/client";
import { SnackbarRenderer } from "@/shared/components/snackbar";
import { SnackbarContextProvider } from "@hh.ru/magritte-ui";
import { QueryClientProvider } from "@tanstack/react-query";

import React from "react";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppBreakpointProvider>
      <SnackbarContextProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <SnackbarRenderer />
        </QueryClientProvider>
      </SnackbarContextProvider>
    </AppBreakpointProvider>
  );
};
