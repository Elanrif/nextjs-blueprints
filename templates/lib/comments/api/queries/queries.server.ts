"use client";

import { useQuery } from "@tanstack/react-query";
import type { CommentFilters } from "@/lib/comments/api/types";
import { commentKeys } from ".";
import { getCommentById, getComments } from "../services/comment.server";

export function useComments(filters?: CommentFilters) {
  return useQuery({
    queryKey: commentKeys.list(filters),
    queryFn: async () => {
      const res = await getComments(filters);
      if (!res.ok)
        throw new Error(res.error?.detail || "Failed to fetch comments");
      return res.data;
    },
  });
}

export function useComment(id: number) {
  return useQuery({
    queryKey: commentKeys.detail(id),
    queryFn: async () => {
      const res = await getCommentById(id);
      if (!res.ok)
        throw new Error(res.error?.detail || "Failed to fetch comment");
      return res.data;
    },
    enabled: !!id,
  });
}
