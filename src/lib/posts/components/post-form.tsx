// components/users/UserForm.tsx
// Formulaire de création/édition d'utilisateur
// Utilise react-hook-form + zod pour la validation
// Compatible avec shadcn/ui (Card, Input, Button, Select)

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// shadcn/ui components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/_/components/ui/card";
import { Input } from "@/lib/_/components/ui/input";
import { Button } from "@/lib/_/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/_/components/ui/select";

import {
  userCreateSchema,
  userUpdateSchema,
  type UserFormValues,
  type UserUpdateFormValues,
} from "../schemas/user";
import { Icons } from "@/lib/_/components/icons";
import {
  User,
  UserRole,
  type UserCreatePayload,
  type UserUpdatePayload,
} from "../api/types";
import { userOptions } from "../constants/user-options";
import { createUserMutation, updateUserMutation } from "../api/mutations";

interface UserFormProps {
  initialData: User | null;
  pageTitle: string;
}

export function PostForm({ initialData, pageTitle }: UserFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;
  const formSchema = isEdit ? userUpdateSchema : userCreateSchema;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // react-hook-form avec validation Zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues | UserUpdateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          firstName: initialData?.firstName ?? "",
          lastName: initialData?.lastName ?? "",
          email: initialData?.email ?? "",
          phoneNumber: initialData?.phoneNumber ?? "",
          role: initialData?.role ?? UserRole.USER,
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          role: UserRole.USER,
          password: "",
          confirmPassword: "",
        },
  });

  // Synchroniser le select avec react-hook-form
  useEffect(() => {
    if (initialData?.role) {
      setValue("role", initialData.role);
    }
  }, [initialData, setValue]);

  // Mutation création
  const createMutation = useMutation({
    ...createUserMutation,
    onSuccess: (result) => {
      if (!result.ok) {
        toast.error(result.error?.detail || "Failed to create user");
        return;
      }
      toast.success("User created successfully");
      router.push("/users");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to create user");
    },
  });

  // Mutation modification
  const updateMutation = useMutation({
    ...updateUserMutation,
    onSuccess: (result) => {
      if (!result.ok) {
        toast.error(result.error?.detail || "Failed to update user");
        return;
      }
      toast.success("User updated successfully");
      router.push("/users");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  const onSubmit = (values: UserFormValues | UserUpdateFormValues) => {
    if (isEdit) {
      const updateValues = values as UserUpdateFormValues;
      const payload: UserUpdatePayload = {
        firstName: updateValues.firstName ?? "",
        lastName: updateValues.lastName ?? "",
        email: updateValues.email ?? "",
        phoneNumber: updateValues.phoneNumber ?? "",
        role: updateValues.role ?? UserRole.USER,
      };

      updateMutation.mutate({
        id: initialData.id,
        values: payload,
      });
    } else {
      const createValues = values as UserFormValues;
      const payload: UserCreatePayload = {
        firstName: createValues.firstName,
        lastName: createValues.lastName,
        email: createValues.email,
        phoneNumber: createValues.phoneNumber,
        role: createValues.role,
        password: createValues.password,
        confirmPassword: createValues.confirmPassword,
      };

      createMutation.mutate(payload);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{pageTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Prénom */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                First Name
                <span className="ml-1 inline-block after:text-red-500 after:content-['*']" />
              </label>
              <Input
                {...register("firstName")}
                placeholder="Enter first name"
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Nom */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Last Name
                <span className="ml-1 inline-block after:text-red-500 after:content-['*']" />
              </label>
              <Input
                {...register("lastName")}
                placeholder="Enter last name"
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Email
                <span className="ml-1 inline-block after:text-red-500 after:content-['*']" />
              </label>
              <Input
                type="email"
                {...register("email")}
                placeholder="Enter email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Téléphone */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Phone Number
                <span className="ml-1 inline-block after:text-red-500 after:content-['*']" />
              </label>
              <Input
                {...register("phoneNumber")}
                placeholder="Enter phone number"
                className={errors.phoneNumber ? "border-red-500" : ""}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Mot de passe (uniquement en création) */}
            {!isEdit && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Password
                    <span className="ml-1 inline-block after:text-red-500 after:content-['*']" />
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="Enter password"
                      className={errors.password ? "border-red-500" : ""}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <Icons.eyeOff className="h-5 w-5" />
                      ) : (
                        <Icons.eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Confirm Password
                    <span className="ml-1 inline-block after:text-red-500 after:content-['*']" />
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      placeholder="Confirm password"
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <Icons.eyeOff className="h-5 w-5" />
                      ) : (
                        <Icons.eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Rôle */}
          <div className="w-full space-y-2 md:w-1/2">
            <label className="text-sm font-medium">
              Role
              <span className="ml-1 inline-block after:text-red-500 after:content-['*']" />
            </label>
            <Select
              onValueChange={(value) => setValue("role", value as UserRole)}
              defaultValue={
                initialData?.role?.toString() ?? UserRole.USER.toString()
              }
            >
              <SelectTrigger
                className={`w-full py-5 ${errors.role ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {userOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : (isEdit
                  ? "Update User"
                  : "Create User")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
