import { GoogleSignIn } from "@/services/authServices";
import { SaveUserInFIreStore } from "@/services/usersServices";
import { useQueryClient } from "@tanstack/react-query";
import { getAdditionalUserInfo } from "firebase/auth";
import posthog from "posthog-js";
import { SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Google from "../../assets/icons/google.svg";
import { Button } from "../ui/button";
type Props = {
  logInOrSignUp?: string;
};
const GoogleOAuth = ({ logInOrSignUp }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userDesiredPage = location.state?.userDesiredPage?.pathname || "/";

  const queryClient = useQueryClient();

  const signInWithGoogle = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const results = await GoogleSignIn();
      const isNewUser = getAdditionalUserInfo(results)?.isNewUser;

      if (isNewUser) {
        const userData = {
          displayName: results.user.displayName,
          email: results.user.email,
          photoURL: results.user.photoURL,
          phoneNumber: results.user.phoneNumber,
          providerId: results.providerId || "email",
          profileComplete: false,
        };
        const userUid = results.user.uid;
        queryClient.setQueryData(["user", userUid], userData);

        await SaveUserInFIreStore(userData, userUid).catch((err) => {
          queryClient.invalidateQueries({ queryKey: ["user", userUid] });
          posthog.captureException(err, {
            reason: "failed to save user in db",
            via: "google",
          });
          throw err;
        });
        posthog.capture("user_sign_up", {
          via: "google",
        });
        navigate("/user-info", { replace: true, state: { userDesiredPage } });
        toast.success("Login successful", {
          description: `Welcome ${results.user.displayName}`,
        });
      } else {
        navigate(userDesiredPage, { replace: true });
        posthog.capture("user_log_in", {
          via: "google",
        });
        toast.success("Login successful", {
          description: `Welcome Back ${results.user.displayName}`,
        });
      }
    } catch (error) {
      toast.error("Failed to sign in with Google. Please try again.");
      console.error(error);
      posthog.captureException(error, { place: "google signin" });
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
        src={Google}
      />
    </Button>
  );
};

export default GoogleOAuth;
