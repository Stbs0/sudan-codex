"use client";
import { ModeToggle } from "./mode-toggle";

import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { SidebarTrigger } from "../../ui/sidebar";
import ProfilePic from "./ProfilePic";
import SigninAndLogoutButton from "./SigninAndLogoutButton";
import Logo from "./Logo";
// import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  // Add a context  for the window width from MainContent
  const isMobile = useIsMobile();
  const { user } = useAuth();

  return (
    <header className='flex h-[64px] items-center justify-between border-b bg-inherit p-3 shadow-lg dark:border-neutral-800 dark:bg-slate-800'>
      {(isMobile || user) && null}
      <SidebarTrigger className='dark:invert' />
      <Logo />
      <div className='flex items-center space-x-4'>
        <ModeToggle />

        {user ? (
          <ProfilePic user={user} />
        ) : isMobile ? null : (
          <SigninAndLogoutButton />
        )}
      </div>
    </header>
  );
};

export default Header;
