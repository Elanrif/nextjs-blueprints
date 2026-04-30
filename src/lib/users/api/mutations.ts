import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "./queries";
import { createUser, deleteUser, updateUser } from "./services/user.client";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Parameters<typeof createUser>[0]) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.list(),
      });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Parameters<typeof updateUser>[1];
    }) => updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: userKeys.list(),
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteUser(id);
      if (!res.ok) throw new Error(res.error.detail);
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: userKeys.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: userKeys.list(),
      });
    },
  });
}
