"use client";
import { DataTableColumnHeader } from "@/lib/_/components/ui/table/data-table-column-header";
import type { Post } from "../../api/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Icons } from "@/lib/_/components/icons";

export const columns: ColumnDef<Post>[] = [
  {
    id: "title",
    accessorKey: "title",
    header: ({ column }: { column: Column<Post, unknown> }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    meta: {
      label: "Title",
      placeholder: "Search posts...",
      variant: "text" as const,
      icon: Icons.text,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
    cell: ({ cell }) => {
      const description = cell.getValue<string>();
      return <div className="max-w-xs truncate text-sm">{description}</div>;
    },
  },
  {
    id: "author",
    accessorFn: (row) => row.author?.firstName || "Unknown",
    header: "AUTHOR",
    cell: ({ row }) => (
      <div>
        {row.original.author?.firstName} {row.original.author?.lastName}
      </div>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "CREATED",
    cell: ({ cell }) => {
      const date = cell.getValue<string>();
      return new Date(date).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
