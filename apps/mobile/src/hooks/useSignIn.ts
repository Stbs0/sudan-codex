import { authClient } from "@/lib/auth-client";
import { captureException } from "@sentry/react-native";
import { useState } from "react";
import { toast } from "sonner-native";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/(tabs)/drug-list",
        newUserCallbackURL: "/user-info",
      });
      if (res.error) {
        console.error(res.error);
        toast.error("Something went wrong");
        captureException(res.error);
      }
    } catch (error) {
      console.error(error);

      captureException(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { signIn, loading };
};

export default useSignIn;
