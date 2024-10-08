import MainContent from "@/components/MainLayout/MainContent";
import Header from "@/components/MainLayout/Header";

import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import useAuth from "@/hooks/useAuth";
import SpinnerIcon from "@/assets/icons/SpinnerIcon";

const MainLayout = () => {
  const { loading } = useAuth();
  return (
    <div className='min-h-screen flex flex-col items-center bg-c_light_cyan-800 dark:bg-gray-900 dark:text-white'>
      {loading ? (
        <SpinnerIcon />
      ) : (
        <>
          
          <Header />
          <MainContent>
            <Outlet />
          </MainContent>
          <Toaster />
        </>
      )}
    </div>
  );
};

export default MainLayout;
