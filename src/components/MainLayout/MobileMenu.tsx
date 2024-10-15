import { MenuIcon, Pill, Settings, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

function MobileMenu() {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className='w-6 h-6 text-white' />
      </SheetTrigger>
      <SheetContent className=' w-[40%] bg-white/70 dark:bg-neutral-950/60  backdrop-blur-sm'>
        {/* TODO: add logo and and name of the project */}
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className='grid  gap-4  py-4 '>
          <Button
            variant={"link"}
            onClick={() => navigate("/drug-form")}
            className='flex gap-3 justify-start '>
            <Pill className='w-6 h-6' /> <span>Add Drug</span>
          </Button>
          <Button
            variant={"link"}
            onClick={() => navigate("/profile")}
            className='flex gap-3 justify-start'>
            <User className='w-6 h-6' /> <span>Profile</span>
          </Button>
          <Button
            variant={"link"}
            onClick={() => navigate("/settings")}
            className='flex gap-3 justify-start'>
            <Settings className='w-6 h-6' /> <span>Settings</span>
          </Button>
        </div>
        <div className='grid gap-4 py-4'>
          <Button
            variant={"destructive"}
            onClick={() => signOut(auth)}>
            Sign out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default MobileMenu;
