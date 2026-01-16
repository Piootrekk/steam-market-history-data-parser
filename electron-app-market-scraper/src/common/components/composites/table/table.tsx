import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderRow,
  TableRow,
} from "./table-elements";
type Column<T> = {
  key: keyof T;
  header: string;
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
        {data.map((item, index) => (
          <TableRow key={index} className="hover:bg-muted/50">
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
