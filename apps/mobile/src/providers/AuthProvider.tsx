import { usePostHog } from "posthog-react-native";
import { useEffect, type ReactNode } from "react";

import { AuthContext } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data, isPending, error } = authClient.useSession();
  const posthog = usePostHog();
  const isSignedIn = data !== null;
  const isProfileComplete = data?.user?.isProfileComplete;
  useEffect(() => {
    if (data?.user) {
      posthog.identify(data.user.id, {
        email: data.user.email,
      });
    }
  }, [data, posthog]);
  return (
    <AuthContext
      value={{ data, isPending, error, isSignedIn, isProfileComplete }}>
      {children}
    </AuthContext>
  );
};
