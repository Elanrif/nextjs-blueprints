"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/lib/_/components/ui/sheet";
import { useMutation } from "@tanstack/react-query";
import { createUserMutation, updateUserMutation } from "../api/mutations";
import type { User } from "../api/types";
import { toast } from "sonner";
import * as z from "zod";
import { userSchema, type UserFormValues } from "../schemas/user";
import { useAppForm, useFormFields } from "@/lib/_/components/ui/tanstack-form";
import { Button } from "@/lib/_/components/ui/button";
import { Icons } from "@/lib/_/components/icons";

interface UserFormSheetProps {
  user?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserFormSheet({
  user,
  open,
  onOpenChange,
}: UserFormSheetProps) {
  const isEdit = !!user;

  const createMutation = useMutation({
    ...createUserMutation,
    onSuccess: () => {
      toast.success("User created successfully");
      onOpenChange(false);
      form.reset();
    },
    onError: () => toast.error("Failed to create user"),
  });

  const updateMutation = useMutation({
    ...updateUserMutation,
    onSuccess: () => {
      toast.success("User updated successfully");
      onOpenChange(false);
    },
    onError: () => toast.error("Failed to update user"),
  });

  const form = useAppForm({
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      password: "",
      confirmPassword: "",
    } as UserFormValues,
    validators: {
      onSubmit: userSchema,
    },
    onSubmit: async ({ value }) => {
      await (isEdit ? updateMutation.mutateAsync({ id: user.id, values: value }) : createMutation.mutateAsync(value));
    },
  });

  const { FormTextField, FormSelectField } = useFormFields<UserFormValues>();

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit User" : "New User"}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Update the user details below."
              : "Fill in the details to create a new user."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto">
          <form.AppForm>
            <form.Form id="user-form-sheet" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormTextField
                  name="firstName"
                  label="First Name"
                  required
                  placeholder="John"
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
                  placeholder="Doe"
                  validators={{
                    onBlur: z
                      .string()
                      .min(2, "Last name must be at least 2 characters"),
                  }}
                />
              </div>

              <FormTextField
                name="email"
                label="Email"
                required
                type="email"
                placeholder="john@example.com"
                validators={{
                  onBlur: z.string().email("Please enter a valid email"),
                }}
              />

              <FormTextField
                name="phoneNumber"
                label="Phone"
                required
                type="tel"
                placeholder="(555) 123-4567"
                validators={{
                  onBlur: z.string().min(1, "Phone number is required"),
                }}
              />

              <FormTextField
                name="password"
                label="Password"
                required
                type="password"
                placeholder="********"
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
                placeholder="********"
                validators={{
                  onBlur: z
                    .string()
                    .min(8, "Confirm password must be at least 8 characters"),
                }}
              />
            </form.Form>
          </form.AppForm>
        </div>

        <SheetFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="user-form-sheet" isLoading={isPending}>
            <Icons.check /> {isEdit ? "Update User" : "Create User"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function UserFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className="mr-2 h-4 w-4" /> Add User
      </Button>
      <UserFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
