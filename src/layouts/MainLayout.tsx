import Header from "@/components/MainLayout/Header";

import Footer from "@/components/MainLayout/Footer";
import { Outlet, useLocation } from "react-router-dom";

import { Toaster } from "sonner";

import { AppSidebar } from "@/components/MainLayout/app-sidebar";
import useAuth from "@/hooks/useAuth";
// import DevAlert from "@/components/DevAlert";
// import { AnimatePresence, motion } from "motion/react";
import SpinnerOverlay from "@/components/SpinnerOverlay";
import { Suspense } from "react";

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
