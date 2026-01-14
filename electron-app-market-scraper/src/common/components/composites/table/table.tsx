import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
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
            <TableHeader key={String(column.key)}>{column.header}</TableHeader>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
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
