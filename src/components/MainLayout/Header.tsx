import { ModeToggle } from "./mode-toggle";
import { Input } from "../ui/input";
import PopoverSearch from "../form/PopoverSearch";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { auth } from "@/config/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import useAuth from "@/hooks/useAuth";
import SpinnerIcon from "@/assets/icons/SpinnerIcon";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

const Header = () => {
  // Add a context  for the window width from MainContent
  const { toast } = useToast();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  console.log(auth.currentUser);
  // const auth1 = getAuth();
  // console.log("sss", auth1.currentUser);
  return (
    <header className='w-full flex justify-between items-center p-4 bg-gray-800'>
      <div
        onClick={() => navigate("/")}
        className='text-2xl font-bold text-white cursor-pointer'>
        DrugWiki
      </div>
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

        {isDesktop &&
          (!loading && user ? (
            <>
              {" "}
              <Button
                className=''
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
              <Avatar>
                <AvatarImage src={user?.photoURL || undefined} />
                <AvatarFallback>
                  {getInitials(user?.displayName || "")}
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            !loading && (
              <>
                <Button
                  className='text-white hover:bg-blue-700 bg-blue-600'
                  variant={"link"}
                  onClick={() => {
                    navigate("/sign-up");
                  }}>
                  Join
                </Button>
                <Button
                  className='text-white hover:bg-blue-700 bg-blue-600 '
                  variant={"link"}
                  onClick={() => {
                    navigate("/log-in");
                  }}>
                  Sign In
                </Button>
              </>
            )
          ))}
        {!isDesktop && (
          <Drawer>
            <DrawerTrigger>
              <MenuIcon className='w-6 h-6 text-white' />
            </DrawerTrigger>
            <DrawerContent>
              {/* TODO: add logo and and name of the project */}
              <DrawerTitle>Menu</DrawerTitle>
              {/* TODO add this menu after adding settings page and profile and the other pages */}
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </header>
  );
};

export default Header;
