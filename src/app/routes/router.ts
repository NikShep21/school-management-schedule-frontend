import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { SchedulePage } from "@/pages/schedulePage";
import { paths } from "@/shared/config/routes/paths";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: React.createElement(Navigate, {
          to: paths.schedule,
          replace: true,
        }),
      },
      {
        path: paths.schedule,
        Component: SchedulePage,
      },
    ],
  },
]);
