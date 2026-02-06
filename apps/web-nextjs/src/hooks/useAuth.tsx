"use client";
import { BetterFetchError } from "better-auth/react";
import { usePostHog } from "posthog-js/react";
import { createContext, type ReactNode, useContext, useEffect } from "react";

import { authClient, Session } from "@/lib/auth-client";

export interface AuthContextType {
  data: Session | null;
  isPending: boolean;
  error: BetterFetchError | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data, isPending, error } = authClient.useSession();
  const posthog = usePostHog();
  useEffect(() => {
    if (data?.user) {
      posthog.identify(data.user.id, {
        email: data.user.email,
      });
    }
  }, [data, posthog]);

  return (
    <AuthContext value={{ data, isPending, error }}>{children}</AuthContext>
  );
};
