import { Button } from "../ui/button";
import { SyntheticEvent } from "react";
import { toast } from "sonner";
import { FaceBookSignIn } from "@/services/authServices";

import { getAdditionalUserInfo } from "firebase/auth";
import { SaveUserInFIreStore } from "@/services/usersServices";
import { useNavigate } from "react-router-dom";
import facebook from "../../assets/icons/facebook.svg";

type Props = {
  isSubmitting: boolean;
  logInOrSignUp?: string;
};
const FaceBookOAuth = ({ isSubmitting, logInOrSignUp }: Props) => {
  const navigate = useNavigate();
  const signInWithFaceBook = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const results = await FaceBookSignIn();
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
      toast.error("Failed to sign in with FaceBook. Please try again.");
      console.log(error);
    }
  };
  return (
    <Button
      variant='outline'
      className='flex w-full items-center justify-center gap-2'
      disabled={isSubmitting}
      onClick={signInWithFaceBook}>
      {logInOrSignUp} with FaceBook
      <img
        src={facebook}
        className='w-7'
      />
    </Button>
  );
};

export default FaceBookOAuth;