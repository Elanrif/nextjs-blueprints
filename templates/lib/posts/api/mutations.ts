import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostAction, deletePostAction, updatePostAction } from "./action";
import { postKeys } from "./queries";
import { PostCreate, PostUpdate } from "./types";

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PostCreate) => {
      const res = await createPostAction(data);
      if (!res.ok)
        throw new Error(res.error?.detail || "Failed to create post");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postKeys.all,
      });
    },
  });
}

/** Modifier un post */
export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: PostUpdate }) => {
      const res = await updatePostAction(id, data);
      if (!res.ok)
        throw new Error(res.error?.detail || "Failed to update post");
      return res.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: postKeys.all,
      });
    },
  });
}

/** Supprimer un post */
export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deletePostAction(id);
      if (!res.ok)
        throw new Error(res.error?.detail || "Failed to delete post");
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: postKeys.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: postKeys.all,
      });
    },
  });
}
