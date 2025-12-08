"use client";
import { authClient } from "@/lib/auth-client";
import { usePostHog } from "posthog-js/react";
import type { SyntheticEvent } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
type Props = {
  logInOrSignUp?: string;
};
const GoogleOAuth = ({ logInOrSignUp }: Props) => {
  const posthog = usePostHog();

  const signInWithGoogle = async (e: SyntheticEvent) => {
    // TODO: add toast after logging in or sign up
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/drug-list",
      newUserCallbackURL: "/user-info",
    });
    if (data.error) {
      toast.error("Failed to sign in with Google. Please try again.");
      console.error(data.error);
      posthog.captureException(data.error, { place: "google signin" });
    }
  };

  return (
    <Button
      variant='outline'
      className='flex w-full items-center justify-center gap-2'
      onClick={signInWithGoogle}>
      {logInOrSignUp} with Google
      <img
        className='w-7'
        src={"/icons/google.svg"}
        alt='Google Logo'
        loading='eager'
        title='Google logo'
      />
    </Button>
  );
};

export default GoogleOAuth;
