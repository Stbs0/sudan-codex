"use client";
import { auth } from "@/lib/firebaseAuth";
import { SaveUserReturnTypes } from "@/lib/types";
import { getUser } from "@/services/usersServices";
import {
  type QueryObserverResult,
  type RefetchOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: SaveUserReturnTypes | undefined;
  authLoading: boolean;
  isError: boolean;
  error: null | Error;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<SaveUserReturnTypes | undefined, Error>>;
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
  const [userLoading, setUserLoading] = useState(true);
  const [userUid, setUserUid] = useState<undefined | string>(undefined);
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: user,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", userUid],
    queryFn: async () => await getUser(userUid!),

    enabled: !!userUid,
  });
  useEffect(() => {
    // setUserLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (fireBaseUser) => {
      if (fireBaseUser) {
        queryClient.prefetchQuery({
          queryKey: ["user", fireBaseUser.uid],
          queryFn: async () => await getUser(fireBaseUser.uid),
        });

        setUserUid(fireBaseUser.uid);
      } else {
        setUserUid(undefined);
      }

      setUserLoading(false);
    });

    return unsubscribe;
  }, []);
  const authLoading = userLoading || isLoading;
  return (
    <AuthContext value={{ user, authLoading, isError, error, refetch }}>
      {children}
    </AuthContext>
  );
};
