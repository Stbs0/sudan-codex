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
import SignUp from "@/pages/SignUp";
import Login from "@/pages/LogIn";
import UserPersonalInfo from "@/pages/UserPersonalInfo";

const router = createBrowserRouter([
  {
    element: <MainLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "sign-up",
        element: (
          <RHFSignUpProvider>
            <SignUp />
          </RHFSignUpProvider>
        ),
      },
      {
        path: "log-in",
        element: (
          <RHFLogInProvider>
            <Login />
          </RHFLogInProvider>
        ),
      },

      {
        element: <PrivateRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },

          {
            path: "drug-list",
            element: <DrugList />,
            children: [
              {
                path: "/drug-list/:no",
                element: <DrugInfo />,
              },
            ],
          },

          {
            path: "user-info",
            element: (
              <RHFTellUsMore>
                <UserPersonalInfo />
              </RHFTellUsMore>
            ),
          },
        ],
      },
    ],
  },
]);
export default router;
