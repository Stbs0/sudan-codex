"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import ProfilePic from "./ProfilePic";
import SigninAndLogoutButton from "./SigninAndLogoutButton";

export function SigninAndLogoutButtonOrProfilePic() {
  const { data, isPending } = useAuth();
  const isMobile = useIsMobile();
  if (isPending) return null;
  if (data) {
    return <ProfilePic user={data.user} />;
  } else {
    return isMobile ? null : <SigninAndLogoutButton />;
  }
}
