import { createBrowserRouter, Params, RouteObject } from "react-router-dom";

import { HydrateFallback } from "@/components/HydrateFallBack";
import PrivateRoute from "@/components/PrivateRoute";
import MainLayout from "@/layouts/MainLayout";
import drugDB from "@/lib/indexedDB";
import GlobalError from "@/pages/GlobalError";
import ErrorElement from "@/components/ErrorElement";
const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    ErrorBoundary: GlobalError,
    HydrateFallback: HydrateFallback,
    children: [
      {
        lazy: async () => {
          const { default: NotFound } = await import("@/components/NotFound");
          return { Component: NotFound };
        },
      },
      {
        index: true,
        path: "/",

        lazy: async () => {
          const { default: Home } = await import("@/pages/Home");
          return { Component: Home };
        },
      },
      {
        path: "/policy",

        lazy: async () => {
          const { default: Policy } = await import("@/pages/Policy");
          return { Component: Policy };
        },
      },
      {
        path: "sign-up",
        lazy: async () => {
          const { default: SignUp } = await import("@/pages/SignUp");
          return { Component: SignUp };
        },
      },
      {
        path: "log-in",
        lazy: async () => {
          const { default: LogIn } = await import("@/pages/LogIn");
          return { Component: LogIn };
        },
      },

      {
        element: <PrivateRoute />,
        ErrorBoundary: ErrorElement,

        children: [
          {
            path: "/drug-list/:no",
            lazy: async () => {
              const { default: DrugInfo } = await import("@/pages/DrugInfo");
              return { Component: DrugInfo };
            },
            loader: async ({ params }: { params: Params<"no"> }) => {
              const [data] = await drugDB.drugList
                .where("no")
                .equals(params.no || "")
                .toArray();
              return data;
            },
          },

          {
            path: "drug-list",
            lazy: async () => {
              const { default: DrugList } = await import("@/pages/DrugList");
              return { Component: DrugList };
            },
          },

          {
            path: "user-info",
            lazy: async () => {
              const { default: UserPersonalInfo } = await import(
                "@/pages/UserPersonalInfo"
              );
              return { Component: UserPersonalInfo };
            },
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default router;
