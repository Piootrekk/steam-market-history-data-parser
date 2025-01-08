import PriceFetcher from "./PriceFetcher";
import { TTransaction } from "./types/transaction.types";
import getCurrencyISO from "./utils/transformCurrencies";

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
    "Current Price",
  ];
  const imagePreLink = `https://community.fastly.steamstatic.com/economy/image/`;
  return (
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
                src={`${imagePreLink}${transaction.icon_url}`}
                alt={transaction.market_hash_name}
                className="transaction-icon"
              />
            </td>
            <td>{transaction.market_hash_name}</td>
            <td>{`${transaction.price} ${getCurrencyISO(
              transaction.currency
            )}`}</td>
            <td>{transaction.original_amount}</td>
            <td>{new Date(transaction.time_event * 1000).toLocaleString()}</td>
            <td>
              <div className="actions">
                <button className="action-btn">
                  <a
                    target="_blank"
                    href={`https://steamcommunity.com/market/listings/${
                      transaction.appid
                    }/${encodeURIComponent(transaction.market_hash_name)}`}
                  >
                    Steam market
                  </a>
                </button>
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
            <td>
              <PriceFetcher
                name={transaction.market_hash_name}
                game={transaction.appid.toString()}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableData;
