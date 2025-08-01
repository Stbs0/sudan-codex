import { GoogleSignIn } from "@/services/authServices";
import { SaveUserInFIreStore } from "@/services/usersServices";
import { useQueryClient } from "@tanstack/react-query";
import { getAdditionalUserInfo } from "firebase/auth";
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
          throw err;
        });

        navigate("/user-info", { replace: true, state: { userDesiredPage } });
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
