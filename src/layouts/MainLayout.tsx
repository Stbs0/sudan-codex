import Header from "@/components/MainLayout/Header";

import Footer from "@/components/MainLayout/Footer";
import { Outlet, useLocation } from "react-router-dom";

import { Toaster } from "sonner";

import { AppSidebar } from "@/components/MainLayout/app-sidebar";
import useAuth from "@/hooks/useAuth";
import DevAlert from "@/components/DevAlert";
import { AnimatePresence, motion } from "motion/react";
import { Suspense } from "react";
import SpinnerOverlay from "@/components/SpinnerOverlay";

const MainLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  return (
    <>
      {user && <AppSidebar />}
      <div className='grid w-full content-between dark:bg-slate-800'>
        <Header />

        {/* <main className='container mx-auto py-8'> */}
        {/* <Outlet /> */}
        {/* </main> */}
        <AnimatePresence mode='wait'>
          <motion.main
            className='container mx-auto py-8'
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y:  }}
            transition={{ duration: 0.3 }}>
            <Suspense fallback={<SpinnerOverlay />}>
              <Outlet />
            </Suspense>
          </motion.main>
        </AnimatePresence>
        <Toaster
          richColors
          expand={true}
          closeButton
        />
        <DevAlert />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
