"use client";
import { authClient, Session } from "@/lib/auth-client";
import { BetterFetchError } from "better-auth/react";
import { createContext, type ReactNode, useContext } from "react";

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
  console.log("user", data);
  return (
    <AuthContext value={{ data, isPending, error }}>{children}</AuthContext>
  );
};
