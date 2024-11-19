import { getUser } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";

const useGetUser = () => {
  const { user } = useAuth();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const idToken = await user!.getIdToken();
      return await getUser(idToken);
    },
    enabled: !!user,
  });

  return { isPending, isError, data, error };
};

export default useGetUser;
