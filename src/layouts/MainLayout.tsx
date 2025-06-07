import Header from "@/components/MainLayout/Header";

import Footer from "@/components/MainLayout/Footer";
import { Outlet, useLocation } from "react-router-dom";

import { toast, Toaster } from "sonner";

import { AppSidebar } from "@/components/MainLayout/app-sidebar";
// import DevAlert from "@/components/DevAlert";
// import { AnimatePresence, motion } from "motion/react";
import SpinnerOverlay from "@/components/SpinnerOverlay";
import { Suspense, useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();
  useEffect(() => {
    const showDev = sessionStorage.getItem("showDev");
    if (!showDev) {
      toast.info(
        "This website is still in development; some features may not work as expected.",
        {
          duration: 10000,
        }
      );
      sessionStorage.setItem("showDev", "true");
    }
  }, []);
  return (
    <>
      <AppSidebar />
      <div className='grid w-full content-between dark:bg-slate-800'>
        <Header />

        <main
          className='container mx-auto py-8'
          key={location.pathname}>
          <Suspense fallback={<SpinnerOverlay />}>
            <Outlet />
          </Suspense>
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
