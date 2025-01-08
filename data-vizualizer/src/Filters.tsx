import { useEffect, useState } from "react";

type FiltersProps = {
  onSearch: (searchTerm: string) => void;
};

const Filters: React.FC<FiltersProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onSearch]);

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default Filters;
