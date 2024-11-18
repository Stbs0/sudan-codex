import { Button } from "./ui/button";
import { SyntheticEvent } from "react";
import { toast } from "sonner";
import { FaceBookSignIn } from "@/services/authServices";
import FaceBookIcon from "@/assets/icons/FacebookIcon";
import { getAdditionalUserInfo } from "firebase/auth";
import { SaveUserInFIreStore } from "@/services/usersServices";

type Props = {
  isSubmitting: boolean;
  logInOrSignUp?: string;
};
const FaceBookOAuth = ({ isSubmitting, logInOrSignUp }: Props) => {
  const signInWithFaceBook = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const results = await FaceBookSignIn();
      const isNewUser = getAdditionalUserInfo(results)?.isNewUser;

      if (isNewUser) {
        await SaveUserInFIreStore(results.user);
      }
    } catch (error) {
      toast.error("Failed to sign in with FaceBook. Please try again.");
      console.log(error);
    }
  };
  return (
    <Button
      variant='outline'
      className='w-full flex items-center justify-center gap-2'
      disabled={isSubmitting}
      onClick={async (e) => await signInWithFaceBook(e)}>
      {logInOrSignUp} with FaceBook <FaceBookIcon />
    </Button>
  );
};

export default FaceBookOAuth;
