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

export type PostFilters = {
  page?: number;
  size?: number;
  sort?: string;
};
