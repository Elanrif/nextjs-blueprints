import { UserSummary } from "@/lib/users/api/types";

export type CommentFilters = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
};

export interface Comment {
  id: number;
  content: string;
  postId: number;
  author: UserSummary;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreate {
  content: string;
  postId: number;
  authorId: number;
}

export type CommentUpdate = Partial<CommentCreate>;
