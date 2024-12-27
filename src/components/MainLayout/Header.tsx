import HomeBtn from "./HomeBtn";
import { ModeToggle } from "./mode-toggle";
import { Input } from "../ui/input";
// import PopoverSearch from "../form/PopoverSearch";

import useAuth from "@/hooks/useAuth";

import UnauthorizedUserBtns from "./UnauthorizedUserBtns";
import ProfilePic from "./ProfilePic";
import { SidebarTrigger } from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import Logo from "./Logo";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  // Add a context  for the window width from MainContent
  const isMobile = useIsMobile();
  const { user, loading } = useAuth();

  return (
    <header className='flex h-[64px] shrink-0 items-center justify-between border-b p-3 shadow-lg shadow-purple-200 dark:border-neutral-800 dark:shadow-neutral-900'>
      <SidebarTrigger />
      <HomeBtn />
      <Logo />
      <div className='flex items-center space-x-4'>
        <ModeToggle />

        {!isMobile ? (
          <Input
            placeholder='Search'
            className='border-none bg-gray-700 text-white focus:ring-2 focus:ring-blue-500'
          />
        ) : null}

        {loading ? (
          <Skeleton className='h-10 w-10 rounded-full' />
        ) : user ? (
          <ProfilePic />
        ) : (
          <UnauthorizedUserBtns />
        )}
      </div>
    </header>
  );
};

export default Header;
