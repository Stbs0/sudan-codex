import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Separator } from "../ui/separator";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { toast } from "sonner";

const ProfilePic = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/log-in");
    toast.success("Good Bye" + user?.displayName);
  };
  if (!user) {
    return null;
  }

  return (
    <Popover
      onOpenChange={() => {
        setOpen(!open);
      }}>
      <PopoverTrigger className='flex items-center'>
        <Avatar>
          <AvatarImage
            src={user?.photoURL ?? undefined}
            alt='profile picture'
          />
          <AvatarFallback>
            {getInitials(user?.displayName || "  ")}
          </AvatarFallback>
        </Avatar>
        <ChevronUp
          className={`h-4 w-4 shrink-0 opacity-50 ${!open ? "rotate-180" : ""}`}
        />
      </PopoverTrigger>
      <PopoverContent
        className='w-28 p-0'
        onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className='grid'>
          <Link to={"/profile"}>
            <Button
              variant={"link"}
              className='w-full outline-hidden'>
              Profile
            </Button>
          </Link>
          <Separator />

          <Separator />
          <Button
            variant={"link"}
            className='text-red-500'
            onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
        <PopoverPrimitive.Arrow />
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePic;
