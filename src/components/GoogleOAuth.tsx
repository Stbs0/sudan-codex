import { Button } from "./ui/button";
import { SyntheticEvent } from "react";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { toast } from "sonner";
import { GoogleSignIn } from "@/services/authServices";
import { getAdditionalUserInfo } from "firebase/auth";
import { SaveUserInFIreStore } from "@/services/usersServices";
import { useNavigate } from "react-router-dom";

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
        console.log(results);

        await SaveUserInFIreStore(results.user, results.providerId ?? "");
        navigate("/user-info", {
          replace: true,
          state: { type: "success", message: "Login successful" },
        });
      } else {
        navigate("/", {
          replace: true,
          state: { type: "success", message: "Login successful" },
        });
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
