"use client";
import { ModeToggle } from "./mode-toggle";

import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { SidebarTrigger } from "../../ui/sidebar";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import SigninAndLogoutButton from "./SigninAndLogoutButton";
// import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  // Add a context  for the window width from MainContent
  const isMobile = useIsMobile();
  const { user } = useAuth();

  return (
    <header className='bg-background flex h-16 items-center justify-between border-b p-3 shadow-sm'>
      {(isMobile || user) && null}
      <SidebarTrigger />
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
