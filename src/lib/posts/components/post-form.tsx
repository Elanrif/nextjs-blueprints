// components/posts/PostForm.tsx
// Formulaire de création/édition de post
// Utilise react-hook-form + zod pour la validation
// Compatible avec shadcn/ui (Card, Input, Button, Select)

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
import { Input } from "@/lib/_/components/ui/input";
import { Button } from "@/lib/_/components/ui/button";
import { Textarea } from "@/lib/_/components/ui/textarea";

import {
  postCreateSchema,
  postUpdateSchema,
  type PostFormValues,
  type PostUpdateFormValues,
} from "../schemas/post";
import type { Post, PostCreate, PostUpdate } from "../api/types";
import { createPostMutation, updatePostMutation } from "../api/mutations";

interface PostFormProps {
  initialData: Post | null;
  pageTitle: string;
}

export function PostForm({ initialData, pageTitle }: PostFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;
  const formSchema = isEdit ? postUpdateSchema : postCreateSchema;

  // react-hook-form avec validation Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues | PostUpdateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          title: initialData?.title ?? "",
          description: initialData?.description ?? "",
          imageUrl: initialData?.imageUrl ?? "",
        }
      : {
          title: "",
          description: "",
          imageUrl: "",
        },
  });

  // Mutation création
  const createMutation = useMutation({
    ...createPostMutation,
    onSuccess: (result) => {
      if (!result.ok) {
        toast.error(result.error?.detail || "Failed to create post");
        return;
      }
      toast.success("Post created successfully");
      router.push("/posts");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to create post");
    },
  });

  // Mutation modification
  const updateMutation = useMutation({
    ...updatePostMutation,
    onSuccess: (result) => {
      if (!result.ok) {
        toast.error(result.error?.detail || "Failed to update post");
        return;
      }
      toast.success("Post updated successfully");
      router.push("/posts");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to update post");
    },
  });

  const onSubmit = (values: PostFormValues | PostUpdateFormValues) => {
    if (isEdit) {
      const updateValues = values as PostUpdateFormValues;
      const payload: PostUpdate = {
        title: updateValues.title ?? "",
        description: updateValues.description ?? "",
        imageUrl: updateValues.imageUrl ?? "",
      };

      updateMutation.mutate({
        id: initialData.id,
        values: payload,
      });
    } else {
      const createValues = values as PostFormValues;
      const payload: PostCreate = {
        title: createValues.title,
        description: createValues.description,
        imageUrl: createValues.imageUrl,
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Title */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                Title
                <span className="ml-1 inline-block after:text-red-500 after:content-['*']" />
              </label>
              <Input
                {...register("title")}
                placeholder="Enter post title"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                Description
                <span className="ml-1 inline-block after:text-red-500 after:content-['*']" />
              </label>
              <Textarea
                {...register("description")}
                placeholder="Enter post description"
                className={errors.description ? "border-red-500" : ""}
                rows={5}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">
                Image URL
                <span className="ml-1 inline-block after:text-red-500 after:content-['*']" />
              </label>
              <Input
                type="url"
                {...register("imageUrl")}
                placeholder="Enter image URL"
                className={errors.imageUrl ? "border-red-500" : ""}
              />
              {errors.imageUrl && (
                <p className="text-sm text-red-500">
                  {errors.imageUrl.message}
                </p>
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
                  ? "Update Post"
                  : "Create Post")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
