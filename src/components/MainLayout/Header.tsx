import HomeBtn from "./HomeBtn";
import { ModeToggle } from "./mode-toggle";
import { Input } from "../ui/input";
import PopoverSearch from "../form/PopoverSearch";
import { Button } from "../ui/button";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import useMediaQuery from "@/hooks/useMediaQuery";

import UnauthorizedUserBtns from "./UnauthorizedUserBtns";
import ProfilePic from "./ProfilePic";
import MobileMenu from "./MobileMenu";

const Header = () => {
  // Add a context  for the window width from MainContent
  const { toast } = useToast();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { user, loading } = useAuth();
  console.log(auth.currentUser);

  return (
    <header className='w-full flex justify-between items-center p-4 bg-gray-800'>
      <HomeBtn />
      <div className='flex items-center space-x-4'>
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
                  toast({
                    title: "log out successfully",
                    description: ` Goodbye ${user.displayName}`,
                  });
                  await signOut(auth);
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
