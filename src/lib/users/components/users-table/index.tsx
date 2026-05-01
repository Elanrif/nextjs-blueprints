// components/users/UsersTable.tsx
// Tableau des utilisateurs avec TanStack Table
// Supporte tri, filtrage, pagination, sélection
// Utilise shadcn/ui (Table, Button, Input, DropdownMenu, Skeleton)

"use client";

import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

// shadcn/ui components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/_/components/ui/table";
import { Button } from "@/lib/_/components/ui/button";
import { Input } from "@/lib/_/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/lib/_/components/ui/dropdown-menu";
import { Skeleton } from "@/lib/_/components/ui/skeleton";

import { columns as defaultColumns } from "./columns";
import { User } from "../../api/types";
import { usersQueryOptions } from "../../api/queries/queries.client";

interface UsersTableProps {
  columns?: ColumnDef<User>[];
}

export function UsersTable({ columns = defaultColumns }: UsersTableProps) {
  const router = useRouter();

  // États du tableau
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Récupération des données
  const { data, isLoading, error } = useQuery({
    ...usersQueryOptions({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search: columnFilters.find((f) => f.id === "name")?.value as string,
    }),
  });

  if (error) {
    toast.error("Failed to load users");
  }

  const users = data?.ok ? data.data.data : [];
  const totalCount = data?.ok ? data.data.meta.total : 0;
  const pageCount = Math.ceil(totalCount / pagination.pageSize);

  // Configuration de TanStack Table
  const table = useReactTable({
    data: users,
    columns,
    pageCount,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    manualFiltering: true,
  });

  if (isLoading) {
    return <UsersTableSkeleton />;
  }

  return (
    <div className="w-full space-y-4">
      {/* Barre d'outils */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search users..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto h-8">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tableau */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of {totalCount}{" "}
          row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// Skeleton pour l'état de chargement
export function UsersTableSkeleton() {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
      <div className="rounded-md border">
        <div className="space-y-2 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Skeleton className="h-8 w-[80px]" />
        <Skeleton className="h-8 w-[80px]" />
      </div>
    </div>
  );
}
