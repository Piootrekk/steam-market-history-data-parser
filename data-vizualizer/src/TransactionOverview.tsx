import { useEffect, useState } from "react";
import TableData from "./TableData";
import "./styles/table.css";
import getTransactions from "./utils/jsonFetcher";
import Pagination from "./Pagination";
import Filters from "./Filters";

const TransactionOverview = () => {
  const allTransactions = getTransactions();
  const itemsPerPage = 25;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = allTransactions.filter((transaction) =>
    transaction.market_hash_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTransactions.slice(startIndex, endIndex);
  };

  return (
    <>
      <div className="transaction-overview">
        <h1 className="overview-title">Transaction History</h1>
        <Filters onSearch={setSearchTerm} />
        <div className="table-container">
          <TableData transactions={getCurrentPageData()} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default TransactionOverview;
