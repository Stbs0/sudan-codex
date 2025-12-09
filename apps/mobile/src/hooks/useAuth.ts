import type { SaveUserReturnTypes } from "@/types";
import type { QueryObserverResult } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface AuthContextType {
  user: SaveUserReturnTypes | undefined;
  isError: boolean;
  error: unknown;
  refetch?: () => Promise<QueryObserverResult<SaveUserReturnTypes, Error>>;

  userLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
