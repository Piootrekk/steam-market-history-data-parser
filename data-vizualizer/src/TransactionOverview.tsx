import { useEffect, useState } from "react";
import TableData from "./TableData";
import "./styles/table.css";
import getTransactions from "./utils/jsonFetcher";
import Pagination from "./Pagination";
import Filters from "./Filters";
import { TTransaction } from "./types/transaction.types";

const TransactionOverview = () => {
  const allTransactions = getTransactions();
  const itemsPerPage = 25;
  const mainGameIds = ["730", "440", "252490"];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<
    TTransaction["event_action"][]
  >(["Bought", "Sold", "Create", "Cancel"]);
  const [selectedGames, setSelectedGames] = useState<string[]>([
    ...mainGameIds,
    "others",
  ]);
  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch = transaction.market_hash_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesEvent =
      selectedEvents.length > 0 &&
      selectedEvents.includes(transaction.event_action);

    const isOthersSelected = selectedGames.includes("others");
    const transactionAppId = transaction.appid.toString();

    const matchesGames =
      selectedGames.length > 0 &&
      (selectedGames.includes(transactionAppId) ||
        (isOthersSelected && !mainGameIds.includes(transactionAppId)));

    return matchesSearch && matchesEvent && matchesGames;
  });

  const handleEventToggle = (event: TTransaction["event_action"]) => {
    setSelectedEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    );
    setCurrentPage(1);
  };

  const handleGamesSelected = (gameid: string) => {
    setSelectedGames((prev) =>
      prev.includes(gameid)
        ? prev.filter((e) => e !== gameid)
        : [...prev, gameid]
    );
    setCurrentPage(1);
  };

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
        <Filters
          onSearch={setSearchTerm}
          selectedEvents={selectedEvents}
          onEventToggle={handleEventToggle}
          onGameToggle={handleGamesSelected}
          selectedGames={selectedGames}
        />
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
