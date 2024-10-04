import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import RHFProviderContext from "@/contexts/RHFProviderContext";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/LogIn";

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
        element: <RHFProviderContext />,
      },
      { path: "sign-up", element: <SignUp /> },
      { path: "log-in", element: <Login /> },
    ],
  },
]);
export default router;
