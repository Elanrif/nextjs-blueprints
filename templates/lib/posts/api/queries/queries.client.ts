import { useQuery } from "@tanstack/react-query";
import { PostFilters } from "../types";
import { postKeys } from ".";
import { fetchPostById, fetchPosts } from "../services/post.client";

export function usePosts(filters?: PostFilters) {
  return useQuery({
    queryKey: postKeys.list(filters),
    queryFn: async () => {
      const res = await fetchPosts(filters);
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
      const res = await fetchPostById(id);
      if (!res.ok) throw new Error(res.error?.detail || "Failed to fetch post");
      return res.data;
    },
    enabled: !!id,
  });
}
