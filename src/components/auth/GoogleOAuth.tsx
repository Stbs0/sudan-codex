import { Button } from "../ui/button";
import { SyntheticEvent } from "react";
import { toast } from "sonner";
import { GoogleSignIn } from "@/services/authServices";
import { getAdditionalUserInfo } from "firebase/auth";
import { SaveUserInFIreStore } from "@/services/usersServices";
import { useNavigate } from "react-router-dom";
import Google from "../../assets/icons/google.svg?react";
type Props = {
  isSubmitting: boolean;
  logInOrSignUp?: string;
};
const GoogleOAuth = ({ isSubmitting, logInOrSignUp }: Props) => {
  const navigate = useNavigate();

  const signInWithGoogle = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const results = await GoogleSignIn();
      const isNewUser = getAdditionalUserInfo(results)?.isNewUser;

      if (isNewUser) {
        await SaveUserInFIreStore(results.user, results.providerId ?? "");
        navigate("/user-info");
      } else {
        navigate("/");
      }
      toast.success("Login successful", {
        description: "Welcome Back" + results.user.displayName,
      });
    } catch (error) {
      toast.error("Failed to sign in with Google. Please try again.");
      console.log(error);
    }
  };
  return (
    <Button
      variant='outline'
      className='flex w-full items-center justify-center gap-2'
      disabled={isSubmitting}
      onClick={signInWithGoogle}>
      {logInOrSignUp} with Google
      <Google className='w-7' />
    </Button>
  );
};

export default GoogleOAuth;
