import { ModeToggle } from "./mode-toggle";
import { Input } from "../ui/input";
import PopoverSearch from "../form/PopoverSearch";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { auth } from "@/config/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

type Props = {
  windowsWidth: number;
};

const Header = ({ windowsWidth }: Props) => {
  // Add a context  for the window width from MainContent
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const navigate = useNavigate();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        toast({
          title: "Welcome",
          description: `Welcome ${user.displayName}`,
        });
      } else {
        setUser(null);
      }
    });

    return () => unSub();
  }, []);


  return (
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
        {user ? (
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
        ) : (
          <>
            {" "}
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
        )}
      </div>
    </header>
  );
};

export default Header;
