import { AuthContext } from "@/hooks/useAuth";
import { getUser } from "@/services/usersServices";
import {
  type FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePostHog } from "posthog-react-native";
import React, { type ReactNode, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [userAuth, setUserAuth] = useState<null | FirebaseAuthTypes.User>(null);
  const queryClient = useQueryClient();
  const posthog = usePostHog();
  const {
    isLoading,
    isError,
    data: user,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", userAuth?.uid],
    queryFn: async () => {
      if (!userAuth?.uid) {
        throw new Error("No user ID available");
      }
      return await getUser(userAuth.uid);
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!userAuth?.uid,
  });
  useEffect(() => {
    setAuthLoading(true);

    const unsubscribe = onAuthStateChanged(getAuth(), async (fireBaseUser) => {
      if (fireBaseUser) {
        try {
          await queryClient.prefetchQuery({
            queryKey: ["user"],
            queryFn: async () => await getUser(fireBaseUser.uid),
          });
        } catch (error) {
          console.error("Failed to prefetch user data:", error);
          // Handle the error appropriately, maybe set an error state
          queryClient.setQueryData(["user"], undefined);
          Alert.alert("Error", "Failed to prefetch user data.");
        }
        setUserAuth(fireBaseUser);
      } else {
        queryClient.removeQueries({
          queryKey: ["user"],
          exact: true,
        });
        setUserAuth(null);
      }

      setAuthLoading(false);
    });

    return unsubscribe;
  }, [queryClient]);

  useEffect(() => {
    if (error) {
      posthog.captureException(error, {
        label: "fetch user error",
      });
    }
  }, [posthog, error]);

  const userLoading = useMemo(
    () => isLoading || authLoading,
    [isLoading, authLoading],
  );

  return (
    <AuthContext value={{ user, userLoading, isError, error, refetch }}>
      {children}
    </AuthContext>
  );
};
