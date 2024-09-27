import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import RHFProviderContext from "@/contexts/RHFProviderContext";

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
      }
    ],
  },
]);
export default router;
