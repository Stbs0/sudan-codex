import { FaceBookSignIn } from "@/services/authServices";
import { SyntheticEvent } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

import { SaveUserInFIreStore } from "@/services/usersServices";
import { useQueryClient } from "@tanstack/react-query";
import { getAdditionalUserInfo } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Facebook from "../../assets/icons/facebook.svg";

type Props = {
  logInOrSignUp?: string;
};
const FaceBookOAuth = ({ logInOrSignUp }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userDesiredPage = location.state?.userDesiredPage?.pathname || "/";
  const queryClient = useQueryClient();
  const signInWithFaceBook = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const results = await FaceBookSignIn();
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
          throw err;
        });
        navigate("/user-info", { replace: true });
        toast.success("Login successful", {
          description: `Welcome ${results.user.displayName}`,
        });
      } else {
        navigate(userDesiredPage, { replace: true });
        toast.success("Login successful", {
          description: `Welcome Back ${results.user.displayName}`,
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
      className='flex w-full items-center justify-center gap-2'
      onClick={signInWithFaceBook}>
      {logInOrSignUp} with FaceBook
      <img
        className='w-7'
        src={Facebook}
      />
    </Button>
  );
};

export default FaceBookOAuth;
