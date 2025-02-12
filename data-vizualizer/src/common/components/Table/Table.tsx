import "./table.css";

import { ReactNode } from "react";

type TTableProps = {
  elements: Record<string, ReactNode>;
};

const Table: React.FC<TTableProps> = ({ elements }) => {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(elements).map((thread) => (
            <th key={thread}>
              <div className="th-content">{thread}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(elements).map((element) => (
          <tr key={element[0]}>
            <td>{element[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
