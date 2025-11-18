"use client";
import { getInitials } from "@/lib/utils";
import { logout } from "@/services/authServices";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { SaveUserReturnTypes } from "@/lib/types";
import { useRouter } from "next/navigation";
type ProfilePicProps = {
  user: SaveUserReturnTypes;
};
const ProfilePic = ({ user }: ProfilePicProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await logout();
    router.push("/log-in");
    toast.success(`Good Bye ${user?.displayName}`);
    await queryClient.invalidateQueries({
      queryKey: ["user", user?.uid],
      refetchType: "none",
    });
  };

  return (
    <Popover>
      <PopoverTrigger className='flex items-center rounded-full'>
        <Avatar>
          <AvatarImage
            src={user.photoURL}
            alt='profile picture'
          />
          <AvatarFallback>
            {getInitials(user?.displayName || "User")}
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
