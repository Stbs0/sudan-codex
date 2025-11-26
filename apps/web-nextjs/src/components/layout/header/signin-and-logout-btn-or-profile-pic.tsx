"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import ProfilePic from "./ProfilePic";
import SigninAndLogoutButton from "./SigninAndLogoutButton";

export function SigninAndLogoutButtonOrProfilePic() {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  if (user) {
    return <ProfilePic user={user} />;
  } else {
    return isMobile ? null : <SigninAndLogoutButton />;
  }
}
