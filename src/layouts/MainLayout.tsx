import Header from "@/components/MainLayout/Header";

import { Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/MainLayout/Footer";

import { Toaster, toast } from "sonner";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/MainLayout/app-sidebar";
import { useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();
  useEffect(() => {
    const { type, message } = location.state || {};
    if (type === "error") {
      toast.error(message);
    }

    if (type === "success") {
      toast.success(message);
    }

    if (type === "warning") {
      toast.warning(message);
    }

    if (type === "info") {
      toast.info(message);
    }
  }, [location.state]);
  return (
    <>
      <AppSidebar />
      <SidebarInset className='   dark:bg-gray-900 dark:text-white   '>
        <Header />
        <main className=' grid p-8 h-full '>
          <Outlet />
        </main>
        <Toaster
          richColors
          expand={true}
          closeButton
        />
        <Footer />
      </SidebarInset>
    </>
  );
};

export default MainLayout;
