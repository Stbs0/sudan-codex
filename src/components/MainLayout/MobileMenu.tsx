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
import { auth } from "@/lib/firebase";

function MobileMenu() {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className='h-6 w-6 text-white' />
      </SheetTrigger>
      <SheetContent className='w-[40%] bg-white/70 backdrop-blur-xs dark:bg-neutral-950/60'>
        {/* TODO: add logo and and name of the project */}
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className='grid gap-4 py-4'>
          <Button
            variant={"link"}
            onClick={() => navigate("/drug-form")}
            className='flex justify-start gap-3'>
            <Pill className='h-6 w-6' /> <span>Add Drug</span>
          </Button>
          <Button
            variant={"link"}
            onClick={() => navigate("/profile")}
            className='flex justify-start gap-3'>
            <User className='h-6 w-6' /> <span>Profile</span>
          </Button>
          <Button
            variant={"link"}
            onClick={() => navigate("/settings")}
            className='flex justify-start gap-3'>
            <Settings className='h-6 w-6' /> <span>Settings</span>
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
