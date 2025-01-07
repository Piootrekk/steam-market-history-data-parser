import { useState } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = useState("");

  const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(inputPage);
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
      setInputPage("");
    }
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
          onClick={() => onPageChange(1)}
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
          onClick={() => onPageChange(i)}
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
          onClick={() => onPageChange(totalPages)}
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
        onClick={() => onPageChange(1)}
      >
        {"<<"}
      </button>
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
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
        onClick={() => onPageChange(currentPage + 1)}
      >
        {">"}
      </button>
      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
