import { mutationOptions } from "@tanstack/react-query";
import { userKeys } from "./queries";
import { createUser, deleteUser, updateUser } from "./services/user.client";
import { UserMutationPayload } from "./types";
import { getQueryClient } from "@/lib/query-client";

export const createUserMutation = mutationOptions({
  mutationFn: (data: UserMutationPayload) => createUser(data),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: userKeys.all });
  },
});

export const updateUserMutation = mutationOptions({
  mutationFn: ({ id, values }: { id: number; values: UserMutationPayload }) =>
    updateUser(id, values),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: userKeys.all });
  },
});

export const deleteUserMutation = mutationOptions({
  mutationFn: (id: number) => deleteUser(id),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: userKeys.all });
  },
});
