import Header from "@/components/MainLayout/Header";

import { Outlet } from "react-router-dom";
import Footer from "@/components/MainLayout/Footer";

import { Toaster } from "sonner";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/MainLayout/app-sidebar";

const MainLayout = () => {
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
