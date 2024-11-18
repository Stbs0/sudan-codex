import { Button } from "./ui/button";
import { SyntheticEvent } from "react";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { toast } from "sonner";
import { GoogleSignIn } from "@/services/authServices";
import { getAdditionalUserInfo } from "firebase/auth";
import { SaveUserInFIreStore } from "@/services/usersServices";

type Props = {
  isSubmitting: boolean;
  logInOrSignUp?: string;
};
const GoogleOAuth = ({ isSubmitting, logInOrSignUp }: Props) => {
  const signInWithGoogle = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const results = await GoogleSignIn();
      const isNewUser = getAdditionalUserInfo(results)?.isNewUser;

      if (isNewUser) {
        await SaveUserInFIreStore(results.user);
      }
    } catch (error) {
      toast.error("Failed to sign in with Google. Please try again.");
      console.log(error);
    }
  };
  return (
    <Button
      variant='outline'
      className='w-full flex items-center justify-center gap-2'
      disabled={isSubmitting}
      onClick={async (e) => await signInWithGoogle(e)}>
      {logInOrSignUp} with Google <GoogleIcon />
    </Button>
  );
};

export default GoogleOAuth;
