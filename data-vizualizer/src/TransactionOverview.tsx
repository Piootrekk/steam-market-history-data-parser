import TableData from "./TableData";
import "./styles/table.css";
import getTransactions from "./utils/jsonFetcher";

const TransactionOverview = () => {
  return <TableData transactions={getTransactions()} />;
};

export default TransactionOverview;
