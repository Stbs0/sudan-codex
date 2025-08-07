import { auth } from "@/lib/firebase";
import { getUser } from "@/services/usersServices";
import { SaveUserReturnTypes } from "@/types/types";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: SaveUserReturnTypes | undefined;
  userLoading: boolean;
  isLoading: boolean;
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
  const [useruid, setUseruid] = useState<undefined | string>(undefined);
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: user,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", useruid],
    queryFn: async () => await getUser(useruid!),

    enabled: !!useruid,
  });
  useEffect(() => {
    setUserLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (fireBaseUser) => {
      console.log("firebase user", fireBaseUser);
      if (fireBaseUser) {
        queryClient.prefetchQuery({
          queryKey: ["user", fireBaseUser.uid],
          queryFn: async () => await getUser(fireBaseUser.uid),
          retry: false,
        });
        console.log("inside query", fireBaseUser.uid);
        setUseruid(fireBaseUser.uid);
      } else {
        setUseruid(undefined);
      }
      console.log("loading");

      setUserLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext
      value={{ user, userLoading, isLoading, isError, error, refetch }}>
      {children}
    </AuthContext>
  );
};
