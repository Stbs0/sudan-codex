import { authClient } from "@/lib/auth-client";
import { usePostHog } from "posthog-react-native";
import { useState } from "react";
import { toast } from "sonner-native";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const posthog = usePostHog();

  const signIn = async () => {
    setLoading(true);
    try {
      console.log("first");
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/(tabs)/drug-list",
      });
      console.log("res.data", res.data);
      if (res.error) {
        console.error(res.error);
        toast.error("Something went wrong");
        posthog.captureException(res.error, {
          platform: "mobile",
          authClient: "better-auth",
        });
      }
    } catch (error) {
      console.error(error);

      posthog.captureException(error, {
        platform: "mobile",
        authClient: "better-auth",
        place: "try-catch",
      });
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return { signIn, loading };
};

export default useSignIn;
