"use client";

import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useStore } from "@tanstack/react-form";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  useFieldContext,
  useFormContext,
  FormFieldSet,
  FormField,
  FormFieldError,
  createFormField,
} from "../../ui/form-context";
import { FieldDescription, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { Spinner } from "../../ui/spinner";

interface TextFieldProps extends Omit<
  React.ComponentProps<"input">,
  "value" | "onChange" | "onBlur"
> {
  label: string;
  description?: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "tel" | "url" | "number";
  showPasswordToggle?: boolean;
  passwordToggleIcons?: {
    show?: React.ReactNode;
    hide?: React.ReactNode;
  };
}

export function TextField({
  label,
  description,
  required,
  type = "text",
  className,
  showPasswordToggle = false,
  passwordToggleIcons,
  ...inputProps
}: TextFieldProps) {
  const field = useFieldContext();
  const form = useFormContext();
  const isTouched = useStore(field.store, (s) => s.meta.isTouched);
  const isValid = useStore(field.store, (s) => s.meta.isValid);
  const isValidating = useStore(field.store, (s) => s.meta.isValidating);
  const hasSubmitted = useStore(form.store, (s) => s.submissionAttempts > 0);
  const value = useStore(field.store, (s) => s.value) as string | number;
  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordField = type === "password" && showPasswordToggle;
  const hasVisibleError = (isTouched || hasSubmitted) && !isValid;
  const labelClassName = cn(hasVisibleError && "text-destructive");

  return (
    <FormFieldSet>
      <FormField>
        <FieldLabel htmlFor={field.name} className={labelClassName}>
          {label}
          {required && <span className="text-destructive"> *</span>}
        </FieldLabel>
        <div className="relative">
          <Input
            id={field.name}
            type={isPasswordField ? (showPassword ? "text" : "password") : type}
            value={value ?? ""}
            onBlur={field.handleBlur}
            onChange={(e) => {
              if (type === "number") {
                const v = e.target.value;
                field.handleChange(v === "" ? "" : Number.parseFloat(v));
              } else {
                field.handleChange(e.target.value);
              }
            }}
            aria-invalid={hasVisibleError}
            className={cn(className, isPasswordField && "pr-10")}
            {...inputProps}
          />
          {isPasswordField && (
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center px-3"
            >
              {showPassword
                ? (passwordToggleIcons?.hide ?? (
                    <IconEyeOff className="h-4 w-4" />
                  ))
                : (passwordToggleIcons?.show ?? (
                    <IconEye className="h-4 w-4" />
                  ))}
            </button>
          )}
          {isValidating && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Spinner className="h-4 w-4" />
            </div>
          )}
        </div>
        {description && <FieldDescription>{description}</FieldDescription>}
      </FormField>
      <FormFieldError />
    </FormFieldSet>
  );
}

export const FormTextField = createFormField(TextField);
