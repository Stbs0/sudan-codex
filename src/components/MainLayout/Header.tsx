import { ModeToggle } from "./mode-toggle";
// import { Input } from "../ui/input";
// import PopoverSearch from "../form/PopoverSearch";

import { memo } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import SigninAndLogoutButton from "./SigninAndLogoutButton";
// import { useIsMobile } from "@/hooks/use-mobile";

const Header = memo(() => {
  // Add a context  for the window width from MainContent
  const isMobile = useIsMobile();
  const { user, userLoading } = useAuth();

  return (
    <header className='sticky inset-x-0 top-0 z-50 flex h-[64px] items-center justify-between border-b bg-white p-3 shadow-lg dark:border-neutral-800 dark:bg-slate-800'>
      {(isMobile || user) && <SidebarTrigger className='dark:invert' />}

      <Logo />
      <div className='flex items-center space-x-4'>
        <ModeToggle />

        {/* {!isMobile ? (
          <Input
            placeholder='Search'
            className='border-none dark:bg-gray-700 focus:ring-2 focus:ring-blue-500'
          />
        ) : null} */}

        {userLoading ? (
          <Skeleton className='h-14 w-14 rounded-full' />
        ) : user ? (
          <ProfilePic />
        ) : isMobile ? null : (
          <SigninAndLogoutButton />
        )}
      </div>
    </header>
  );
});

export default Header;
