import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";

import RHFSignUpProvider from "@/providers/RHFSignUpProvider";
import RHFLogInProvider from "@/providers/RHFLogInProvider";
import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from "@/layouts/MainLayout";
import DrugList from "@/pages/DrugList";
import DrugInfo from "@/pages/DrugInfo";
import Profile from "@/pages/Profile";
import RHFTellUsMore from "@/providers/RHFTellUsMore";
import IsProfileComplete from "@/components/IsProfileComplete";

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
        element: <PrivateRoute />,
        children: [
          {
            element: <IsProfileComplete />,
            children: [
              {
                path: "profile",
                element: <Profile />,
              },

              {
                path: "drug/:no",
                element: <DrugInfo />,
              },
              {
                path: "drug-list",
                element: <DrugList />,
              },
            ],
          },
          {
            path: "user-info",
            element: <RHFTellUsMore />,
          },
        ],
      },
    ],
  },
]);
export default router;
