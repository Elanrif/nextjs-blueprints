/**
 * User types — API response models (no validation)
 * See: src/lib/users/schemas/user.schema.ts for form validation
 */

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type UserFilters = {
  page?: number;
  limit?: number;
  roles?: string;
  search?: string;
  sort?: string;
};

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatarUrl?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UsersResponse = {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export interface UserSummary {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  email: string;
  role?: UserRole;
}

export interface UserLogin {
  token: string;
  refreshToken: string;
  user: User;
}

export interface ResetPassword {
  code: string;
  resetToken: string;
  email: string;
  newPassword: string;
}

export interface UserCreatePayload {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
  password: string;
  confirmPassword: string;
  avatarUrl?: string;
}

export interface UserUpdatePayload {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
  password?: string;
  confirmPassword?: string;
  avatarUrl?: string;
}

export type UserMutationPayload = UserCreatePayload;
