import { getUser } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";

import useAuth from "./useAuth";

const useGetUser = () => {
  const { user } = useAuth();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["user", user?.uid],
    queryFn: async () => {
      return await getUser();
    },
  });

  return { isLoading, isError, data, error };
};

export default useGetUser;
