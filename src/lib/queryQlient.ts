import { updateUser } from "@/services/usersServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateUserSchemaType } from "./schemas";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (data: UpdateUserSchemaType) => {
      return await updateUser(data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  return mutate;
};
