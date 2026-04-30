import { UserSearchFilter } from "../types";

export const userKeys = {
  all: ["users"] as const,
  list: () => [...userKeys.all, "list"] as const,
  detail: (id: number) => [...userKeys.all, "detail", id] as const,
  search: (filters: UserSearchFilter) =>
    [...userKeys.all, "search", filters] as const,
};
