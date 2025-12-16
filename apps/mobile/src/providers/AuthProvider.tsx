import { AuthContext } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import type { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data, isPending, error } = authClient.useSession();
  const isSignedIn = data !== null;
  const isProfileComplete = data?.user?.isProfileComplete;
  return (
    <AuthContext
      value={{ data, isPending, error, isSignedIn, isProfileComplete }}
    >
      {children}
    </AuthContext>
  );
};
