"use client";
import { Badge } from "@/lib/_/components/ui/badge";
import { DataTableColumnHeader } from "@/lib/_/components/ui/table/data-table-column-header";
import type { User } from "../../api/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ROLE_OPTIONS } from "./options";
import { Icons } from "@/lib/_/components/icons";

export const columns: ColumnDef<User>[] = [
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">
          {row.original.firstName} {row.original.lastName}
        </span>
        <span className="text-xs text-muted-foreground">
          {row.original.email}
        </span>
      </div>
    ),
    meta: {
      label: "Name",
      placeholder: "Search users...",
      variant: "text" as const,
      icon: Icons.text,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "phoneNumber",
    header: "PHONE",
  },
  {
    id: "role",
    accessorKey: "role",
    enableSorting: false,
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ cell }) => {
      return (
        <Badge variant="outline" className="capitalize">
          {cell.getValue<User["role"]>()}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: "roles",
      variant: "multiSelect" as const,
      options: ROLE_OPTIONS,
    },
  },
  {
    id: "status",
    accessorFn: (row) => (row.isActive ? "Active" : "Inactive"),
    header: "STATUS",
    cell: ({ cell }) => {
      const status = cell.getValue<string>();
      const variant =
        status === "Active"
          ? "default"
          : (status === "Inactive"
            ? "secondary"
            : "outline");
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
