"use client";
import { authClient } from "@/lib/auth-client";
import { usePostHog } from "posthog-js/react";
import { useState, type SyntheticEvent } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
type Props = {
  logInOrSignUp?: string;
};
const GoogleOAuth = ({ logInOrSignUp }: Props) => {
  const posthog = usePostHog();
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error(error);
      posthog.captureException(error, { place: "unexpected error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2"
      onClick={signInWithGoogle}
      data-analytics="google-sign-in"
    >
      {logInOrSignUp} with Google
      <img
        className="w-7"
        src={"/icons/google.svg"}
        alt="Google Logo"
        loading="eager"
        title="Google logo"
      />
    </Button>
  );
};

export default GoogleOAuth;
