import { SaveUserInFireStore } from "@/services/usersServices";
import type { UserDataToSaveToFirebaseTypes } from "@/types";
import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "@react-native-firebase/auth";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { usePostHog } from "posthog-react-native";
import { useState } from "react";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const posthog = usePostHog();

  const signIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const idToken = response.data?.idToken;
        if (!idToken) {
          throw new Error("No ID token found");
        }

        const googleCredential = GoogleAuthProvider.credential(idToken);

        const UserCred = await signInWithCredential(
          getAuth(),
          googleCredential,
        );
        const additionalInfo = getAdditionalUserInfo(UserCred);
        if (additionalInfo?.isNewUser) {
          const user: UserDataToSaveToFirebaseTypes = {
            displayName: UserCred.user.displayName,
            email: UserCred.user.email,
            photoURL: UserCred.user.photoURL,
            phoneNumber: UserCred.user.phoneNumber,
            providerId: UserCred.user.providerId,
            profileComplete: false,
          };
          await SaveUserInFireStore(user, UserCred.user.uid);
          posthog.capture("new_user_sign_up");
        }
      } else {
        // sign in was cancelled by user
        console.log("else");
        posthog.capture("sign_in_cancelled");
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log("inprogress");
            // operation (eg. sign in) already in progress
            posthog.captureException(error, {
              label: "inprogress",
            });
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            posthog.captureException(error, {
              label: "play_services_not_available",
            });
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the flow
            return;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    } finally {
      setLoading(false);
    }
  };
  return { signIn, loading };
};

export default useSignIn;
