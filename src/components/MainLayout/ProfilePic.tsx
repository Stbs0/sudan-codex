import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Separator } from "../ui/separator";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useState } from "react";
import { ChevronUp } from "lucide-react";

const ProfilePic = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <Popover
      onOpenChange={() => {
        setOpen(!open);
      }}>
      <PopoverTrigger className='flex min-w-14 items-center'>
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
          className={`w-4 h-4 shrink-0 opacity-50  ${!open ? "rotate-180" : ""}`}
        />
      </PopoverTrigger>
      <PopoverContent
        className='w-28 p-0 '
        onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className='grid '>
          <Link to={"/profile"}>
            <Button
              variant={"link"}
              className='w-full outline-none'>
              Profile
            </Button>
          </Link>
          <Separator />

          <Separator />
          <Button
            variant={"link"}
            className='text-red-500 '
            onClick={async () => {
              await signOut(auth);
              navigate("/log-in", {
                replace: true,
                state: {
                  type: "success",
                  message: `Goodbye ${user.displayName}`,
                },
              });
            }}>
            Sign Out
          </Button>
        </div>
        <PopoverPrimitive.Arrow />
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePic;
