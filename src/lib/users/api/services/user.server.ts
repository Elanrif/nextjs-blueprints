"server-only";

import apiClient from "@config/api.config";
import environment from "@config/environment.config";
import {
  User,
  UserCreatePayload,
  UserFilters,
  UserSearchFilter,
  UserUpdatePayload,
  UsersResponse,
} from "@/lib/users/api/types";
import {
  parseUserCreate,
  parseUserUpdate,
} from "@lib/users/schemas/user";
import { getLogger } from "@config/logger.config";
import { ApiErrorResponse } from "@/lib/_/errors/api-error.server";
import { Result } from "@/lib/_/errors/response.model";
import { ApiError, badRequestApiError } from "@/lib/_/errors/api-error";
import { validateId } from "@/utils";

/**
 * ⚠️ Never trust the client input
 * ❌ Someone can bypass the form
 * ✅ Protection against malicious bugs
 */
const {
  api: {
    rest: {
      endpoints: { users: usersUrl },
    },
  },
} = environment;

const logger = getLogger("server");

export async function getUsers(
  filters: UserFilters,
): Promise<Result<UsersResponse, ApiError>> {
  try {
    // 🔥 Clean undefined params
    const cleanParams: Record<string, string> = {};

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null && value !== "") {
        cleanParams[key] = String(value);
      }
    }
    const queryParams = new URLSearchParams(cleanParams).toString();
    const url = `${usersUrl}${queryParams ? `?${queryParams}` : ""}`;

    const res = await apiClient(true).get<UsersResponse>(url);
    logger.info({ count: res.data.meta.total }, "get users");
    return { ok: true, data: res.data };
  } catch (error) {
    logger.error({ context: "getUsers" }, "Error getting users");
    return {
      ok: false,
      error: ApiErrorResponse(error, "getUsers"),
    };
  }
}

/**
 * Create a new user
 */
export async function createUser(
  user: UserCreatePayload,
): Promise<Result<User, ApiError>> {
  /**
   * Validate input data
   */
  const parse = parseUserCreate(user);
  if (!parse.success) {
    logger.warn({ context: "createUser", errors: parse.error.message }, "validation failed");
    return {
      ok: false,
      error: badRequestApiError(parse.error.message),
    };
  }

  try {
    const res = await apiClient(true).post<User>(usersUrl, parse.data);
    logger.info({ id: res.data.id }, "User created successfully");
    return { ok: true, data: res.data };
  } catch (error) {
    // ✅ Email supprimé des logs (RGPD — PII)
    logger.error({ context: "createUser" }, "Failed to create user");
    return {
      ok: false,
      error: ApiErrorResponse(error, "createUser"),
    };
  }
}

export async function getUserById(id: number): Promise<Result<User, ApiError>> {
  const idError = validateId(id);
  if (idError) return idError;

  try {
    const res = await apiClient(true).get<User>(`${usersUrl}/${id}`);
    return { ok: true, data: res.data };
  } catch (error) {
    logger.error({ id }, "Failed to get user");
    return {
      ok: false,
      error: ApiErrorResponse(error, "getUserById"),
    };
  }
}

export async function searchUsersFilter(
  filters: UserSearchFilter,
): Promise<Result<User[], ApiError>> {
  const params = new URLSearchParams();
  if (filters.email) params.set("email", filters.email);
  if (filters.firstName) params.set("firstName", filters.firstName);
  if (filters.lastName) params.set("lastName", filters.lastName);
  if (filters.isActive !== undefined)
    params.set("isActive", String(filters.isActive));

  try {
    const res = await apiClient(true).get<User[]>(
      `${usersUrl}/search?${params.toString()}`,
    );
    logger.info({ count: res.data.length, filters }, "Users search completed");
    return { ok: true, data: res.data };
  } catch (error) {
    logger.error({ filters }, "Failed to search users");
    return {
      ok: false,
      error: ApiErrorResponse(error, "searchUsersFilter"),
    };
  }
}

export async function updateUser(
  id: number,
  user: UserUpdatePayload,
): Promise<Result<User, ApiError>> {
  const idError = validateId(id);
  if (idError) return idError;

  const parse = parseUserUpdate(user);
  if (!parse.success) {
    logger.warn(
      { context: "updateUser", errors: parse.error.message },
      "validation failed",
    );
    return {
      ok: false,
      error: badRequestApiError(parse.error.message),
    };
  }

  try {
    const res = await apiClient(true).patch<User>(
      `${usersUrl}/${id}`,
      parse.data,
    );
    logger.info({ id }, "User updated successfully");
    return { ok: true, data: res.data };
  } catch (error) {
    logger.error({ id }, "Failed to update user");
    return {
      ok: false,
      error: ApiErrorResponse(error, "updateUser"),
    };
  }
}

/**
 * Delete a user
 */
export async function deleteUser(
  id: number,
): Promise<Result<{ success: boolean }, ApiError>> {
  const idError = validateId(id);
  if (idError) return idError;

  try {
    await apiClient(true).delete(`${usersUrl}/${id}`);
    logger.info({ id }, "User deleted successfully");
    return { ok: true, data: { success: true } };
  } catch (error) {
    logger.error({ id }, "Failed to delete user");
    return {
      ok: false,
      error: ApiErrorResponse(error, "deleteUser"),
    };
  }
}
