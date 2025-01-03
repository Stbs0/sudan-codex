import { getTokenId, updateUser } from "@/services/usersServices";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { UpdateUserSchemaType } from "./schemas";

export const queryClient = new QueryClient();

export const useUpdateUser = () => {
  const { mutate } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (data: UpdateUserSchemaType) => {
      const idToken = await getTokenId();
      return await updateUser(idToken!, data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  return mutate;
};
