import Header from "@/components/MainLayout/Header";

import { Outlet } from "react-router-dom";
import Footer from "@/components/MainLayout/Footer";

import { Toaster } from "sonner";

import { AppSidebar } from "@/components/MainLayout/app-sidebar";

const MainLayout = () => {
  return (
    <>
      <AppSidebar />
      <div className='grid w-full content-between dark:bg-slate-800'>
        <Header />

        <main className='container mx-auto py-8'>
          <Outlet />
        </main>

        <Toaster
          richColors
          expand={true}
          closeButton
        />

        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
