import { type Session } from "@/lib/auth-client";
import { BetterFetchError } from "better-auth/react";
import { createContext, useContext } from "react";

export interface AuthContextType {
  data: Session | null;
  isPending: boolean;
  error: BetterFetchError | null;
  isSignedIn: boolean;
  isProfileComplete: boolean | null | undefined;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
