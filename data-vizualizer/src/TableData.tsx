import { TTransaction } from "./types/transaction.types";

type TableDataProps = {
  transactions: TTransaction[];
};

const TableData: React.FC<TableDataProps> = ({ transactions }) => {
  const tabletheads = [
    "Nr",
    "Event",
    "Icon",
    "Market Hash Name",
    "Price",
    "Amount",
    "Time",
    "Action",
  ];

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {tabletheads.map((thead) => (
              <th key={thead}>
                <div className="th-content">{thead}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={`${transaction.listingid}_${index}`}>
              <td>{index + 1}</td>
              <td>
                <span>{transaction.event_action}</span>
              </td>
              <td>
                <img
                  src={`https://community.fastly.steamstatic.com/economy/image/${transaction.icon_url}`}
                  alt={transaction.market_hash_name}
                  className="transaction-icon"
                />
              </td>
              <td>{transaction.market_hash_name}</td>
              <td>{transaction.price}</td>
              <td>{transaction.original_amount}</td>
              <td>
                {transaction.time_transaction
                  ? new Date(transaction.time_transaction).toLocaleString()
                  : ""}
              </td>
              <td>
                <div className="actions">
                  {transaction.wiki_page && (
                    <button className="action-btn">
                      <a target="_blank" href={transaction.wiki_page}>
                        Wiki
                      </a>
                    </button>
                  )}
                  {transaction.inspect_in_game_url && (
                    <button className="action-btn">
                      <a target="_blank" href={transaction.inspect_in_game_url}>
                        Inspect in game
                      </a>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
