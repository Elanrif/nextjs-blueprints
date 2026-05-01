// components/users/columns.tsx
// Définition des colonnes du tableau TanStack Table
// Utilise shadcn/ui (Button, Badge, Checkbox)

"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/lib/_/components/ui/badge";
import { Checkbox } from "@/lib/_/components/ui/checkbox";
import { CellAction } from "./cell-action";
import { User } from "../../api/types";
import { Button } from "@/lib/_/components/ui/button";

export const columns: ColumnDef<User>[] = [
  // Colonne de sélection (checkbox)
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Colonne Nom complet (avec tri)
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">
          {row.original.firstName} {row.original.lastName}
        </span>
        <span className="text-muted-foreground text-xs">
          {row.original.email}
        </span>
      </div>
    ),
  },
  // Téléphone
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
  },
  // Rôle (avec badge)
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge variant="outline" className="capitalize">
          {role}
        </Badge>
      );
    },
  },
  // Statut (actif/inactif)
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  // Actions (modifier/supprimer)
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
