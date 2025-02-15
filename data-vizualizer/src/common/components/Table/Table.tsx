import "./table.css";

type TColumn<T> = {
  name: string;
  render: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: TColumn<T>[];
  data: T[];
  nrCol?: boolean;
};

const Table = <T,>({ columns, data, nrCol: NrCol = false }: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {NrCol && (
            <th>
              <div className="th-content">{"Nr."}</div>
            </th>
          )}
          {columns.map((col, index) => (
            <th key={index}>
              <div className="th-content">{col.name}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {NrCol && <td>{rowIndex + 1}</td>}
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{col.render(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
export type { TColumn };
