import { mutationOptions } from "@tanstack/react-query";
import { userKeys } from "./queries";
import { createUser, deleteUser, updateUser } from "./services/user.client";
import { UserCreatePayload, UserUpdatePayload } from "./types";
import { getQueryClient } from "@/lib/query-client";
import { postKeys } from "@/lib/posts/api/queries";

export const createUserMutation = mutationOptions({
  mutationFn: (data: UserCreatePayload) => createUser(data),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: userKeys.all });
  },
});

export const updateUserMutation = mutationOptions({
  mutationFn: ({ id, values }: { id: number; values: UserUpdatePayload }) =>
    updateUser(id, values),
  onSuccess: (_, { id }) => {
    getQueryClient().invalidateQueries({ queryKey: userKeys.detail(id) });
    getQueryClient().invalidateQueries({ queryKey: userKeys.all });
  },
});

export const deleteUserMutation = mutationOptions({
  mutationFn: (id: number) => deleteUser(id),
  onSuccess: (_, id) => {
    getQueryClient().removeQueries({ queryKey: postKeys.detail(id) });
    getQueryClient().invalidateQueries({ queryKey: postKeys.all });
  },
});
