import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";

import RHFSignUpProvider from "@/providers/RHFSignUpProvider";
import RHFLogInProvider from "@/providers/RHFLogInProvider";
import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from "@/layouts/MainLayout";
import DrugList from "@/pages/DrugList";

const router = createBrowserRouter([
  {
    element: <MainLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },

      { path: "sign-up", element: <RHFSignUpProvider /> },
      { path: "log-in", element: <RHFLogInProvider /> },
      {
        path: "drug-list",
        element: (
          <PrivateRoute>
            <DrugList />
          </PrivateRoute>
        ),
      },
      {
        path: "drug/:no",
        element: (
          <PrivateRoute>
            <DrugList />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
