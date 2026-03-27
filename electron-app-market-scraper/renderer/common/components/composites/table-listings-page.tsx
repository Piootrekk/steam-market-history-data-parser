import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../primitives/card";
import ToggleColumns from "./table/filters/toggle-columns";
import TablePagination from "./table/pagination";
import DataTable, { type Column } from "./table/table";

type TableListingsPageProps<T> = {
  title: string;
  description: string;
  columns: Column<T>[];
  data: T[];
  listingsCount: number;
};

const TableListingsPage = <T extends Record<string, unknown>>({
  title,
  description,
  listingsCount,
  columns,
  data,
}: TableListingsPageProps<T>) => {
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    () =>
      new Set(
        columns
          .filter((col) => col.defaultVisible ?? true)
          .map((col) => col.key.toString()),
      ),
  );

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const filteredColumns = columns.filter((col) =>
    visibleColumns.has(col.key.toString()),
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <ToggleColumns
              columns={columns}
              visibleColumns={visibleColumns}
              onToggle={toggleColumn}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <DataTable columns={filteredColumns} data={data} />
        <TablePagination totalCount={listingsCount} />
      </CardContent>
    </Card>
  );
};

export { TableListingsPage };
