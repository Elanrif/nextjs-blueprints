// components/comments/CommentForm.tsx
// Formulaire de création/édition de commentaire
// Utilise react-hook-form + zod pour la validation
// Compatible avec shadcn/ui (Card, Input, Button)

"use client";

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
import { Button } from "@/lib/_/components/ui/button";
import { Textarea } from "@/lib/_/components/ui/textarea";

import {
  commentCreateSchema,
  commentUpdateSchema,
  type CommentFormValues,
  type CommentUpdateFormValues,
} from "../schemas/comment";
import type { Comment, CommentCreate, CommentUpdate } from "../api/types";
import { createCommentMutation, updateCommentMutation } from "../api/mutations";

interface CommentFormProps {
  initialData: Comment | null;
  pageTitle: string;
}

export function CommentForm({ initialData, pageTitle }: CommentFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;
  const formSchema = isEdit ? commentUpdateSchema : commentCreateSchema;

  // react-hook-form avec validation Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormValues | CommentUpdateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          content: initialData?.content ?? "",
        }
      : {
          content: "",
        },
  });

  // Mutation création
  const createMutation = useMutation({
    ...createCommentMutation,
    onSuccess: (result) => {
      if (!result.ok) {
        toast.error(result.error?.detail || "Failed to create comment");
        return;
      }
      toast.success("Comment created successfully");
      router.push("/comments");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to create comment");
    },
  });

  // Mutation modification
  const updateMutation = useMutation({
    ...updateCommentMutation,
    onSuccess: (result) => {
      if (!result.ok) {
        toast.error(result.error?.detail || "Failed to update comment");
        return;
      }
      toast.success("Comment updated successfully");
      router.push("/comments");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to update comment");
    },
  });

  const onSubmit = (values: CommentFormValues | CommentUpdateFormValues) => {
    if (isEdit) {
      const updateValues = values as CommentUpdateFormValues;
      const payload: CommentUpdate = {
        content: updateValues.content ?? "",
      };

      updateMutation.mutate({
        id: initialData.id,
        values: payload,
      });
    } else {
      const createValues = values as CommentFormValues;
      const payload: CommentCreate = {
        content: createValues.content,
        postId: 1, // À récupérer du contexte/params
        authorId: 1, // À récupérer du contexte utilisateur
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
          <div className="grid grid-cols-1 gap-6">
            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Comment
                <span className="ml-1 inline-block after:text-red-500 after:content-['*']" />
              </label>
              <Textarea
                {...register("content")}
                placeholder="Write your comment here..."
                className={errors.content ? "border-red-500" : ""}
                rows={5}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>
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
                  ? "Update Comment"
                  : "Create Comment")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
