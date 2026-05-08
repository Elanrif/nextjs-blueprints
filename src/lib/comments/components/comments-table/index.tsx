"use client";

import { DataTable } from "@/lib/_/components/ui/table/data-table";
import { DataTableToolbar } from "@/lib/_/components/ui/table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { getSortingStateParser } from "@/lib/parsers";
import { commentsQueryOptions } from "@/lib/comments/api/queries/queries.client";
import { columns } from "./columns";

const columnIds = columns.map((c) => c.id).filter(Boolean) as string[];

export function CommentsTable() {
  const [params] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    content: parseAsString,
    sort: getSortingStateParser(columnIds).withDefault([]),
  });

  const filters = {
    page: params.page,
    limit: params.perPage,
    ...(params.content && { search: params.content }),
    ...(params.sort.length > 0 && { sort: JSON.stringify(params.sort) }),
  };

  const { data } = useSuspenseQuery(commentsQueryOptions(filters));

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
