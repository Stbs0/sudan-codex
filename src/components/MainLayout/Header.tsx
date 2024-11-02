import HomeBtn from "./HomeBtn";
import { ModeToggle } from "./mode-toggle";
import { Input } from "../ui/input";
import PopoverSearch from "../form/PopoverSearch";
import { Button } from "../ui/button";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import useAuth from "@/hooks/useAuth";
import useMediaQuery from "@/hooks/useMediaQuery";

import UnauthorizedUserBtns from "./UnauthorizedUserBtns";
import ProfilePic from "./ProfilePic";
import MobileMenu from "./MobileMenu";
import { toast } from "sonner";
import {  SidebarTrigger } from "../ui/sidebar";

const Header = () => {
  // Add a context  for the window width from MainContent
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { user, loading } = useAuth();
  const signingOut = async () => {
    try {
      await signOut(auth);
      toast("Sign out successful");
    } catch (error) {
      console.log(error);
      toast("Sign out failed");
    }
  };
  return (
    <header className='h-[80px] flex shrink-0 items-center justify-between p-4 bg-primary'>
      <SidebarTrigger /> <HomeBtn />
      <div className='flex items-center  space-x-4'>
        <ModeToggle />

        {isDesktop ? (
          <Input
            placeholder='Search'
            className=' bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500'
          />
        ) : (
          <PopoverSearch />
        )}

        {isDesktop ? (
          !loading && user ? (
            <>
              <Button
                className='text-white hover:bg-blue-700 bg-blue-600 '
                variant={"link"}
                onClick={async () => {
                  await signingOut();
                }}>
                Sign Out
              </Button>
              <ProfilePic />
            </>
          ) : (
            <UnauthorizedUserBtns />
          )
        ) : (
          <MobileMenu />
        )}
      </div>
    </header>
  );
};

export default Header;
