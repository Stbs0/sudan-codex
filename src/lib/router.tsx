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
import drugDB from "@/config/indexedDB";
import Policy from "@/pages/Policy";

const router = createBrowserRouter([
  {
    element: <MainLayout />,

    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/policy",
        element: <Policy />,
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
            path: "/drug-list/:no",
            element: <DrugInfo />,
            loader: async ({ params }) => {
              const [data] = await drugDB.drugList
                .where("no")
                .equals(params.no || "")
                .toArray();
              return data;
            },
          },
          {
            path: "profile",
            element: <Profile />,
          },

          {
            path: "drug-list",
            element: <DrugList />,
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
