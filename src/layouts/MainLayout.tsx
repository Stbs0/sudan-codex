import MainContent from "@/components/MainLayout/MainContent";
import Header from "@/components/MainLayout/Header";

import { Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Footer from "@/components/MainLayout/Footer";
import SpinnerOverlay from "@/components/SpinnerOverlay";
import { Toaster } from "sonner";
const MainLayout = () => {
  const { loading } = useAuth();
  

  return (
    <div className='grid  bg-c_light_cyan-800 dark:bg-gray-900 dark:text-white relative h-full'>
      {loading ? (
        <SpinnerOverlay />
      ) : (
        <>
          <Header />
          <MainContent>
            <Outlet />
          </MainContent>
          <Toaster richColors  expand={true} closeButton/>
          
          <Footer />
        </>
      )}
    </div>
  );
};

export default MainLayout;
