"use client";

import { DataTable } from "@/lib/_/components/ui/table/data-table";
import { DataTableToolbar } from "@/lib/_/components/ui/table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { getSortingStateParser } from "@/lib/parsers";
import { usersQueryOptions } from "@/lib/users/api/queries/queries.client";
import { columns } from "./columns";

const columnIds = columns.map((c) => c.id).filter(Boolean) as string[];

export function UsersTable() {
  const [params] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    name: parseAsString,
    role: parseAsArrayOf(parseAsString, ","),
    sort: getSortingStateParser(columnIds).withDefault([]),
  });

  const filters = {
    page: params.page,
    limit: params.perPage,
    ...(params.name && { search: params.name }),
    ...(params.role &&
      params.role.length > 0 && { roles: params.role.join(",") }),
    ...(params.sort.length > 0 && { sort: JSON.stringify(params.sort) }),
  };

  const { data } = useSuspenseQuery(usersQueryOptions(filters));

  const pageCount = data.ok
    ? Math.ceil(data.data.meta.total / params.perPage)
    : 1;

  const { table } = useDataTable({
    data: data.ok ? data.data.data : [],
    columns,
    pageCount,
    shallow: true,
    debounceMs: 500,
    initialState: {
      columnPinning: { right: ["actions"] },
    },
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
