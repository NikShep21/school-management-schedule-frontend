import { AppProviders } from "@/app/providers/AppProviders";
import { router } from "@/app/routes/router";
import { RouterProvider } from "react-router-dom";

export const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};
