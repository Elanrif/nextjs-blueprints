import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentCreate, CommentUpdate } from "./types";
import {
  createCommentAction,
  deleteCommentAction,
  updateCommentAction,
} from "./action";
import { commentKeys } from "./queries";

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CommentCreate) => {
      const res = await createCommentAction(data);
      if (!res.ok)
        throw new Error(res.error?.detail || "Failed to create comment");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.all,
      });
    },
  });
}

export function useUpdateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: CommentUpdate }) => {
      const res = await updateCommentAction(id, data);
      if (!res.ok)
        throw new Error(res.error?.detail || "Failed to update comment");
      return res.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: commentKeys.all,
      });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteCommentAction(id);
      if (!res.ok)
        throw new Error(res.error?.detail || "Failed to delete comment");
      return res.data;
    },
    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: commentKeys.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: commentKeys.all,
      });
    },
  });
}
