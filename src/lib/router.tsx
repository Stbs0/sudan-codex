import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import RHFNewDrugProvider from "@/providers/RHFNewDrugProviderContext";
import RHFSignUpProvider from "@/providers/RHFSignUpProvider";
import RHFLogInProvider from "@/providers/RHFLogInProvider";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/drug-form",
        element: <RHFNewDrugProvider />,
      },
      { path: "sign-up", element: <RHFSignUpProvider /> },
      { path: "log-in", element: <RHFLogInProvider /> },
    ],
  },
]);
export default router;
