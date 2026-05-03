// components/users/UserForm.tsx
// Formulaire de création/édition d'utilisateur
// Utilise react-hook-form + zod pour la validation
// Compatible avec shadcn/ui (Card, Input, Button, Select)

"use client";

import { useEffect } from "react";
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

import { userSchema, type UserFormValues } from "../schemas/user";
import { User, UserRole } from "../api/types";
import { userOptions } from "../constants/user-options";
import { createUserMutation, updateUserMutation } from "../api/mutations";

interface UserFormProps {
  initialData: User | null;
  pageTitle: string;
}

export function UserForm({ initialData, pageTitle }: UserFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  // react-hook-form avec validation Zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: initialData?.firstName ?? "",
      lastName: initialData?.lastName ?? "",
      email: initialData?.email ?? "",
      phoneNumber: initialData?.phoneNumber ?? "",
      role: initialData?.role ?? UserRole.USER,
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

  const onSubmit = (values: UserFormValues) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      role: values.role,
      password: values.password || "",
      confirmPassword: values.confirmPassword || "",
    };

    if (isEdit) {
      updateMutation.mutate({ id: initialData.id, values: payload });
    } else {
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
              <label className="text-sm font-medium">First Name *</label>
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
              <label className="text-sm font-medium">Last Name *</label>
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
              <label className="text-sm font-medium">Email *</label>
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
              <label className="text-sm font-medium">Phone Number *</label>
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

            {/* Rôle */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Role *</label>
              <Select
                onValueChange={(value) => setValue("role", value as UserRole)}
                defaultValue={
                  initialData?.role?.toString() ?? UserRole.USER.toString()
                }
              >
                <SelectTrigger className={errors.role ? "border-red-500" : ""}>
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

            {/* Mot de passe (uniquement en création) */}
            {!isEdit && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password *</label>
                  <Input
                    type="password"
                    {...register("password")}
                    placeholder="Enter password"
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Confirm Password *
                  </label>
                  <Input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Confirm password"
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </>
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
