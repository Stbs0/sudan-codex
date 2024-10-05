import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import RHFNewDrugProvider from "@/contexts/RHFNewDrugProviderContext";
import Login from "@/pages/LogIn";
import RHFSignUpProvider from "@/contexts/RHFSignUpProvider";

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
      { path: "log-in", element: <Login /> },
    ],
  },
]);
export default router;
