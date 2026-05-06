/**
 * Post types — API response models (no validation)
 * See: src/lib/posts/schemas/post.schema.ts for form validation
 */
import { UserSummary } from "@/lib/users/api/types";

export interface Post {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  likes: number;
  author: UserSummary;
  createdAt: string;
  updatedAt: string;
}

export interface PostCreate {
  title: string;
  imageUrl: string;
  description: string;
  likes?: number;
  authorId: number;
}

export type PostUpdate = Partial<PostCreate>;

export type PostsFilters = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
};

export type PostsResponse = {
  data: Post[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};
