import { auth } from "@/lib/firebase";
import { getUser } from "@/services/usersServices";
import { SaveUserReturnTypes } from "@/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  userLoading: boolean;
  isLoading: boolean;
  isError: boolean;
  data: SaveUserReturnTypes | null | undefined;
  error: null | Error;
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
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [userLoading, setUserLoading] = useState(true);
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["user", user?.uid],
    queryFn: async () => {
      return await getUser();
    },
    enabled: !!user,
  });
  useEffect(() => {
    setUserLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (fireBaseUser) => {
      if (fireBaseUser) {
        setUser(fireBaseUser);

        await queryClient.prefetchQuery({
          queryKey: ["user", fireBaseUser.uid],
          queryFn: async () => {
            return await getUser();
          },
        });
      } else {
        setUser(null);
      }

      setUserLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext value={{ user, userLoading, isLoading, isError, data, error }}>
      {children}
    </AuthContext>
  );
};
