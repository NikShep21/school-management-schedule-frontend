import type { ReactNode } from "react";
import { Breakpoint, BreakpointProvider } from "@hh.ru/magritte-ui";

const getInitialBreakpoint = (): Breakpoint => {
  const width = window.innerWidth;

  if (width >= 1920) return Breakpoint.XXL;
  if (width >= 1440) return Breakpoint.XL;
  if (width >= 1280) return Breakpoint.L;
  if (width >= 1024) return Breakpoint.M;
  if (width >= 600) return Breakpoint.S;

  return Breakpoint.XS;
};

export const AppBreakpointProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BreakpointProvider storedBreakpointValue={getInitialBreakpoint()}>
      {children}
    </BreakpointProvider>
  );
};
