"use client";

import { useStore } from "@tanstack/react-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  useFieldContext,
  FormFieldSet,
  FormField,
  FormFieldError,
  createFormField,
} from "../../ui/form-context";
import { FieldDescription, FieldLabel } from "../../ui/field";

type Option = { value: string | number; label: string };

interface SelectFieldProps {
  label: string;
  description?: string;
  required?: boolean;
  options: Option[];
  placeholder?: string;
  parseValue?: (value: string) => string | number;
}

export function SelectField({
  label,
  description,
  required,
  options,
  placeholder = "Select an option",
  parseValue,
}: SelectFieldProps) {
  const field = useFieldContext();
  const isTouched = useStore(field.store, (s) => s.meta.isTouched);
  const isValid = useStore(field.store, (s) => s.meta.isValid);
  const value = useStore(field.store, (s) => s.value) as
    | string
    | number
    | undefined;

  return (
    <FormFieldSet>
      <FormField>
        <FieldLabel htmlFor={field.name}>
          {label}
          {required && " *"}
        </FieldLabel>
        <Select
          value={value === undefined || value === null ? "" : String(value)}
          onValueChange={(nextValue) => {
            field.handleChange(parseValue ? parseValue(nextValue) : nextValue);
          }}
          onOpenChange={(open) => {
            if (!open) field.handleBlur();
          }}
        >
          <SelectTrigger id={field.name} aria-invalid={isTouched && !isValid}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description && <FieldDescription>{description}</FieldDescription>}
      </FormField>
      <FormFieldError />
    </FormFieldSet>
  );
}

export const FormSelectField = createFormField(SelectField);
