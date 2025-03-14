import { auth } from "@/lib/firebase";
import { getUser } from "@/services/usersServices";
import { SaveUserReturnTypes } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
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
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["user", user?.uid],
    queryFn: async () => await getUser(user!.uid),

    enabled: !!user,
  });
  useEffect(() => {
    setUserLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (fireBaseUser) => {
      if (fireBaseUser) {
        setUser(fireBaseUser);
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
