import MainContent from "@/components/MainLayout/MainContent";
import Header from "@/components/MainLayout/Header";

import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import WindowsWidthProvider from "@/providers/WindowsWidthProvider";

const MainLayout = () => {
 
  return (
    <div className='min-h-screen flex flex-col items-center bg-c_light_cyan-800 dark:bg-gray-900 dark:text-white'>
      <WindowsWidthProvider>
        <Header  />

        <MainContent>
          <Outlet />
        </MainContent>
      </WindowsWidthProvider>
      <Toaster />
    </div>
  );
};

export default MainLayout;
