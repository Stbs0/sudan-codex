import Header from "@/components/MainLayout/Header";

import Footer from "@/components/MainLayout/Footer";
import { Outlet, useLocation } from "react-router-dom";

import { toast } from "sonner";

import { AppSidebar } from "@/components/MainLayout/app-sidebar";
// import DevAlert from "@/components/DevAlert";
// import { AnimatePresence, motion } from "motion/react";
import FixedUI from "@/components/MainLayout/FixedUI";
import SpinnerOverlay from "@/components/SpinnerOverlay";
import { Suspense, useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();
  useEffect(() => {
    const showDev = sessionStorage.getItem("showDev");
    if (!showDev) {
      toast.info(
        "This website is still in development; some features may not work as expected. contact through the whatsApp button",
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
      <div className='grid min-h-full w-full grid-rows-[auto_1fr_auto] bg-slate-100 dark:bg-slate-800'>
        <Header />
        <main key={location.pathname}>
          <Suspense fallback={<SpinnerOverlay />}>
            <Outlet />
          </Suspense>
        </main>
        <FixedUI />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
