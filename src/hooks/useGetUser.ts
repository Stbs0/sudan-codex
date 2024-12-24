import { getUser } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";

const useGetUser = () => {
  const { user } = useAuth();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const idToken = await user!.getIdToken();
      return await getUser(idToken);
    },
    enabled: !!user,
  });

  return { isLoading, isError, data, error };
};

export default useGetUser;
