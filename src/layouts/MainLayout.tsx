import MainContent from "@/components/MainLayout/MainContent";
import Header from "@/components/MainLayout/Header";

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [windowsWidth, setWindowsWidth] = useState(0);
  useEffect(() => {
    setWindowsWidth(window.innerWidth);
  }, []);

  return (
    <div className='min-h-screen flex flex-col items-center bg-c_light_cyan-800 dark:bg-gray-900 dark:text-white'>
      <Header windowsWidth={windowsWidth} />

      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
};

export default MainLayout;
