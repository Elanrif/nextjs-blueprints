"use client";

import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useAppForm, useFormFields } from "@/lib/_/components/ui/tanstack-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/_/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import type { User } from "../api/types";
import { UserFormValues, userSchema } from "../schemas/user";
import { createUserMutation, updateUserMutation } from "../api/mutations";
import { Button } from "@/lib/_/components/ui/button";
import { userOptions } from "../constants/user-options";

export default function UserForm({
  initialData,
  pageTitle,
}: {
  initialData: User | null;
  pageTitle: string;
}) {
  const router = useRouter();
  const isEdit = !!initialData;

  const createMutation = useMutation({
    ...createUserMutation,
    onSuccess: (result) => {
      if (!result.ok) {
        toast.error(result.error.detail || "Failed to create user");
        return;
      }
      toast.success("User created successfully");
      router.push("/users");
    },
    onError: () => {
      toast.error("Failed to create user");
    },
  });

  const updateMutation = useMutation({
    ...updateUserMutation,
    onSuccess: (result) => {
      if (!result.ok) {
        toast.error(result.error.detail || "Failed to update user");
        return;
      }
      toast.success("User updated successfully");
      router.push("/users");
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  const form = useAppForm({
    defaultValues: {
      firstName: initialData?.firstName ?? "",
      lastName: initialData?.lastName ?? "",
      email: initialData?.email ?? "",
      phoneNumber: initialData?.phoneNumber ?? "",
      role: initialData
        ? userOptions.find((o) => o.value === initialData.role)?.value
        : undefined,
      password: "",
      confirmPassword: "",
    } as UserFormValues,
    validators: {
      onSubmit: userSchema,
    },
    onSubmit: ({ value }) => {
      if (isEdit) {
        updateMutation.mutate({ id: initialData!.id, values: value });
      } else {
        createMutation.mutate(value);
      }
    },
  });

  const { FormTextField, FormSelectField } = useFormFields<UserFormValues>();

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form.AppForm>
          <form.Form className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormTextField
                name="firstName"
                label="First Name"
                required
                placeholder="Enter first name"
                validators={{
                  onBlur: z
                    .string()
                    .min(2, "First name must be at least 2 characters"),
                }}
              />

              <FormTextField
                name="lastName"
                label="Last Name"
                required
                placeholder="Enter last name"
                validators={{
                  onBlur: z
                    .string()
                    .min(2, "Last name must be at least 2 characters"),
                }}
              />

              <FormTextField
                name="email"
                label="Email"
                required
                type="email"
                placeholder="Enter email address"
                validators={{
                  onBlur: z.string().email("Please enter a valid email"),
                }}
              />

              <FormTextField
                name="phoneNumber"
                label="Phone Number"
                required
                type="tel"
                placeholder="Enter phone number"
                validators={{
                  onBlur: z
                    .string()
                    .min(10, "Phone number must be at least 10 characters"),
                }}
              />

              <FormSelectField
                name="role"
                label="Role"
                required
                options={userOptions}
                placeholder="Select role"
                parseValue={Number}
                validators={{
                  onBlur: z.number().int().min(1, "Please select a role"),
                }}
              />

              <FormTextField
                name="password"
                label="Password"
                required
                type="password"
                showPasswordToggle
                passwordToggleIcons={{
                  show: <IconEye className="h-4 w-4" />,
                  hide: <IconEyeOff className="h-4 w-4" />,
                }}
                placeholder="Enter password"
                validators={{
                  onBlur: z
                    .string()
                    .min(8, "Password must be at least 8 characters"),
                }}
              />

              <FormTextField
                name="confirmPassword"
                label="Confirm Password"
                required
                type="password"
                showPasswordToggle
                passwordToggleIcons={{
                  show: <IconEye className="h-4 w-4" />,
                  hide: <IconEyeOff className="h-4 w-4" />,
                }}
                placeholder="Confirm password"
                validators={{
                  onBlur: z
                    .string()
                    .min(8, "Password must be at least 8 characters"),
                }}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <form.SubmitButton>
                {isEdit ? "Update user" : "Add user"}
              </form.SubmitButton>
            </div>
          </form.Form>
        </form.AppForm>
      </CardContent>
    </Card>
  );
}
