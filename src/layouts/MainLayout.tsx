import PopoverSearch from "@/components/PopoverSearch";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [windowsWidth, setWindowsWidth] = useState(0);
  useEffect(() => {
    setWindowsWidth(window.innerWidth);
  }, []);
console.log(windowsWidth);
  return (
    <div className='min-h-screen flex flex-col items-center bg-c_light_cyan-800 dark:bg-gray-900 dark:text-white'>
      <header className='w-full flex justify-between items-center p-4 bg-gray-800'>
        <div className='text-2xl font-bold text-white'>DrugWiki</div>
        <div className='flex items-center space-x-4'>
          <ModeToggle />
          {windowsWidth > 600 ? (
            <Input
              placeholder='Search'
              className='w-20 bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500'
            />
          ) : (
            <PopoverSearch />
          )}
          <Button className='bg-blue-600 hover:bg-blue-700'>Join</Button>
          <Button className='bg-blue-600 hover:bg-blue-700'>Sign In</Button>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default MainLayout;
