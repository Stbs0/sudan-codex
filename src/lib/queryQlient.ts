import { updateUser } from "@/services/usersServices";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { UpdateUserSchemaType } from "./schemas";

export const queryClient = new QueryClient();

export const useUpdateUser = () => {
  const { mutate } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (data: UpdateUserSchemaType) => {
      return await updateUser(data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  return mutate;
};
