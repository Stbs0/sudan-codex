"use client";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";

import { AuthContextType } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { getInitials } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Separator } from "../../ui/separator";
type ProfilePicProps = {
  user: NonNullable<AuthContextType["data"]>["user"];
};
const ProfilePic = ({ user }: ProfilePicProps) => {
  const posthog = usePostHog();
  const handleSignOut = async () => {
    await authClient.signOut();
    toast.info(`Good Bye ${user?.name || "User"}`);
    posthog.capture("sign_out");
    posthog.reset(true);
  };

  return (
    <Popover>
      <PopoverTrigger
        className='flex items-center rounded-full'
        data-analytics='header-profile-pic'>
        <Avatar>
          <AvatarImage
            src={user.image ?? undefined}
            alt='profile picture'
          />
          <AvatarFallback>{getInitials(user?.name || "User")}</AvatarFallback>
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
