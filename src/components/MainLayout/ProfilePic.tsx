import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { getInitials } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

const ProfilePic = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/log-in");
    toast.success(`Good Bye ${user?.displayName}`);
    await queryClient.invalidateQueries({
      queryKey: ["user", user?.uid],
      refetchType: "none",
    });
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
      </PopoverTrigger>
      <PopoverContent
        className='w-28 p-0'
        onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className='grid'>
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
