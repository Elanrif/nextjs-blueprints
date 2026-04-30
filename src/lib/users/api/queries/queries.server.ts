import { useQuery } from "@tanstack/react-query";
import type { UserSearchFilter } from "../types";
import { userKeys } from ".";
import {
  getUserById,
  getUsers,
  searchUsersFilter,
} from "../services/user.server";

export function useUsers() {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: async () => {
      const res = await getUsers();
      if (!res.ok) throw new Error(res.error.detail);
      return res.data;
    },
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const res = await getUserById(id);
      if (!res.ok) throw new Error(res.error.detail);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useSearchUsers(filters: UserSearchFilter) {
  return useQuery({
    queryKey: userKeys.search(filters),
    queryFn: async () => {
      const res = await searchUsersFilter(filters);
      if (!res.ok) throw new Error(res.error.detail);
      return res.data;
    },
    enabled: Object.values(filters).some((v) => v !== undefined && v !== ""),
  });
}
