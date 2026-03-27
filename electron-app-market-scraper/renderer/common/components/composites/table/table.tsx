import TableEmpty from "@renderer/common/components/composites/table/table-empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderRow,
  TableRow,
} from "../../primitives/table-elements";

type Column<T> = {
  key: keyof T;
  header: string;
  defaultVisible?: boolean;
  sortable?: boolean;
  render: (item: T) => React.ReactNode;
};

type DataTable<T> = {
  columns: Column<T>[];
  data: T[];
};

type DataTableProps<T> = DataTable<T>;

const DataTable = <T extends Record<string, unknown>>({
  columns,
  data,
}: DataTableProps<T>) => {
  if (data.length === 0) return <TableEmpty />;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderRow key={String(column.key)}>
              {column.header}
            </TableHeaderRow>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={String(item.id)} className="hover:bg-muted/50">
            {columns.map((column) => (
              <TableCell key={String(column.key)}>
                {column.render(item)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
export type { Column, DataTable };
