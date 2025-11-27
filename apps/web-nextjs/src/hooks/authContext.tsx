"use client";

import { SaveUserReturnTypes } from "@/lib/types";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { createContext } from "react";

export interface AuthContextType {
  user: SaveUserReturnTypes | undefined;
  userLoading: boolean;
  isLoading: boolean;
  isError: boolean;
  error: null | Error;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<SaveUserReturnTypes | undefined, Error>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
