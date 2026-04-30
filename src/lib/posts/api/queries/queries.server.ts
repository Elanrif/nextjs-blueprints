"use client";

import { useQuery } from "@tanstack/react-query";
import { PostFilters } from "../types";
import { postKeys } from ".";
import { getPostById, getPosts } from "../services/post.server";

export function usePosts(filters?: PostFilters) {
  return useQuery({
    queryKey: postKeys.list(filters),
    queryFn: async () => {
      const res = await getPosts(filters);
      if (!res.ok)
        throw new Error(res.error?.detail || "Failed to fetch posts");
      return res.data;
    },
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: async () => {
      const res = await getPostById(id);
      if (!res.ok) throw new Error(res.error?.detail || "Failed to fetch post");
      return res.data;
    },
    enabled: !!id,
  });
}
