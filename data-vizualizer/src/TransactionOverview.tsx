import { useState } from "react";
import TableData from "./TableData";
import "./styles/table.css";
import getTransactions from "./utils/jsonFetcher";
import Pagination from "./Pagination";

const TransactionOverview = () => {
  const transactions = getTransactions();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return transactions.slice(startIndex, endIndex);
  };

  return (
    <>
      <TableData transactions={getCurrentPageData()} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default TransactionOverview;
