import "./pagination.css";
import { useState } from "react";

type TablePaginationProps = {
  totalCount: number;
  skip: number | undefined;
  limit: number | undefined;
  onPageChange: (elements: number) => void;
};

const TablePagination: React.FC<TablePaginationProps> = ({
  totalCount,
  skip,
  limit,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = useState("");
  const correctLimit = limit || 30;
  const correctSkip = skip || 0;
  const [currentPage, setCurrentPage] = useState(
    Math.floor(correctSkip / correctLimit) + 1
  );

  const totalPages = Math.ceil(totalCount / correctLimit);

  const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(inputPage);
      if (page >= 1 && page <= totalPages) {
        handlePageChange(page);
      }
      setInputPage("");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const elementsToSkip = (page - 1) * correctLimit;
    onPageChange(elementsToSkip);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const showFirst = currentPage > 2;
    const showLast = currentPage < totalPages - 1;

    if (showFirst) {
      buttons.push(
        <button
          key="1"
          className={`pagination-btn ${currentPage === 1 ? "active" : ""}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (currentPage > 3) {
        buttons.push(
          <span key="ellipsis1" className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (showLast) {
      if (currentPage < totalPages - 2) {
        buttons.push(
          <span key="ellipsis2" className="pagination-ellipsis">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          className={`pagination-btn ${
            currentPage === totalPages ? "active" : ""
          }`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        {"<<"}
      </button>
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {"<"}
      </button>

      {renderPageButtons()}

      <div className="pagination-input-container">
        <input
          type="text"
          className="pagination-input"
          placeholder={`${currentPage}/${totalPages}`}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value.replace(/\D/g, ""))}
          onKeyDown={handlePageInput}
        />
      </div>

      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {">"}
      </button>
      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default TablePagination;
