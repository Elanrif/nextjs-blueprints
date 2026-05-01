"use client";

import { useDataTable } from "@/hooks/use-data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { getSortingStateParser } from "@/lib/parsers";
import { columns } from "./columns";
import { usersQueryOptions } from "../../api/queries/queries.client";

const columnIds = columns.map((c) => c.id).filter(Boolean) as string[];

export function UsersTable() {
  const [params] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    name: parseAsString,
    role: parseAsString,
    sort: getSortingStateParser(columnIds).withDefault([]),
  });

  const filters = {
    page: params.page,
    limit: params.perPage,
    ...(params.name && { search: params.name }),
    ...(params.role && { roles: params.role }),
    ...(params.sort.length > 0 && { sort: JSON.stringify(params.sort) }),
  };

  const { data } = useSuspenseQuery(usersQueryOptions(filters));

  if (!data.ok) {
    console.warn("Error fetching users:", data.error);
  }

  const usersResponse = data.ok
    ? data.data
    : {
        data: [],
        meta: { total: 0, page: 1, limit: params.perPage, totalPages: 0 },
      };
  const pageCount = Math.ceil((usersResponse.meta.total || 0) / params.perPage);

  const { table } = useDataTable({
    data: usersResponse.data ?? [],
    columns,
    pageCount,
    shallow: true,
    debounceMs: 500,
    initialState: {
      columnPinning: { right: ["actions"] },
    },
  });

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table} />
      </DataTable>
    </>
  );
}

export function UsersTableSkeleton() {
  return (
    <div className="flex flex-1 animate-pulse flex-col gap-4">
      <div className="bg-muted h-10 w-full rounded" />
      <div className="bg-muted h-96 w-full rounded-lg" />
      <div className="bg-muted h-10 w-full rounded" />
    </div>
  );
}
