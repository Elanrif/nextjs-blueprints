import { AxiosResponse } from "axios";
import { proxyEnvironment } from "@config/proxy-api.config";
import {
  User,
  UserSearchFilter,
  UserFilters,
  UserMutationPayload,
  UsersResponse,
} from "@lib/users/api/types";
import { frontendHttp } from "@config/axios/frontend-http.config";
import { ApiError } from "@/lib/_/errors/api-error";
import { Result } from "@/lib/_/errors/response.model";

/**
 * ⚠️ NO Logging and error Handling is needed here as the proxy API routes will handle logging.
 * User client service for handling user operations.
 * This service interacts with the proxy API endpoints for user management.
 */

const {
  api: {
    rest: {
      endpoints: { users: usersUrl },
    },
  },
} = proxyEnvironment;

/**
 * Fetch all users (client-side)
 */
export async function fetchUsers(
  filters: UserFilters,
): Promise<Result<UsersResponse, ApiError>> {
  // 🔥 Clean undefined params
  const cleanParams: Record<string, string> = {};

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      cleanParams[key] = String(value);
    }
  }
  const queryParams = new URLSearchParams(cleanParams).toString();
  const url = `${usersUrl}${queryParams ? `?${queryParams}` : ""}`;

  const res = await frontendHttp().get<
    unknown,
    AxiosResponse<Result<UsersResponse, ApiError>>
  >(url);
  return res.data;
}

/**
 * Fetch a single user by ID (client-side)
 */
export async function fetchUserById(
  id: number,
): Promise<Result<User, ApiError>> {
  const res = await frontendHttp().get<
    unknown,
    AxiosResponse<Result<User, ApiError>>
  >(`${usersUrl}/${id}`);
  return res.data;
}

/**
 * Update a user (client-side)
 */
export async function updateUser(
  id: number,
  user: UserMutationPayload,
): Promise<Result<User, ApiError>> {
  const res = await frontendHttp().patch<
    unknown,
    AxiosResponse<Result<User, ApiError>>
  >(`${usersUrl}/${id}`, user);
  return res.data;
}

/**
 * Create a new user (client-side)
 */
export async function createUser(
  user: UserMutationPayload,
): Promise<Result<User, ApiError>> {
  const res = await frontendHttp().post<
    unknown,
    AxiosResponse<Result<User, ApiError>>
  >(usersUrl, user);
  return res.data;
}

/**
 * Delete a user (client-side)
 */
export async function deleteUser(
  id: number,
): Promise<Result<{ success: boolean }, ApiError>> {
  const res = await frontendHttp().delete<
    unknown,
    AxiosResponse<Result<{ success: boolean }, ApiError>>
  >(`${usersUrl}/${id}`);
  return res.data;
}

/**
 * Search users by filters (client-side)
 */
export async function searchUsersFilter(
  filters: UserSearchFilter,
): Promise<Result<User[], ApiError>> {
  const params = new URLSearchParams();
  if (filters.email) params.set("email", filters.email);
  if (filters.firstName) params.set("firstName", filters.firstName);
  if (filters.lastName) params.set("lastName", filters.lastName);
  if (filters.isActive !== undefined)
    params.set("isActive", String(filters.isActive));

  const res = await frontendHttp().get<
    unknown,
    AxiosResponse<Result<User[], ApiError>>
  >(`${usersUrl}/search?${params.toString()}`);
  return res.data;
}
