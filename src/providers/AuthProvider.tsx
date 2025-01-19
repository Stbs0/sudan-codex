import { AuthContext } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { queryClient } from "@/lib/queryQlient";
import { getUser } from "@/services/usersServices";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);
  // console.log("App render: AuthProvider initialized");
  useEffect(() => {
    setLoading(true);
    // console.log("Loading", loading);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log("onAuthStateChanged triggered:", user);

      setUser(user);
      // console.log("Loading",loading)
      setLoading(false);
      if (user) {
        queryClient.prefetchQuery({
          queryKey: ["user", user.uid],
          queryFn: async () => {
            return await getUser();
          },
        });
      }
    });

    return unsubscribe;
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
