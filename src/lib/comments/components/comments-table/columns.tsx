"use client";
import { DataTableColumnHeader } from "@/lib/_/components/ui/table/data-table-column-header";
import type { Comment } from "../../api/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Icons } from "@/lib/_/components/icons";

export const columns: ColumnDef<Comment>[] = [
  {
    id: "content",
    accessorKey: "content",
    header: ({ column }: { column: Column<Comment, unknown> }) => (
      <DataTableColumnHeader column={column} title="Content" />
    ),
    cell: ({ row }) => (
      <div className="max-w-xs truncate">{row.original.content}</div>
    ),
    meta: {
      label: "Content",
      placeholder: "Search comments...",
      variant: "text" as const,
      icon: Icons.text,
    },
    enableColumnFilter: true,
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
