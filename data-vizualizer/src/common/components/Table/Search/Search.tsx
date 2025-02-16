import { useEffect, useState } from "react";
import "./search.css";
import SearchIcon from "@/common/icons/SearchIcon";

type SearchProps = {
  onSearch: (searchTerm: string) => void;
  timeoutDebaunce?: number;
};

const Search: React.FC<SearchProps> = ({ onSearch, timeoutDebaunce }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const defaultTimeout = timeoutDebaunce || 500;

  useEffect(() => {
    if (timeoutDebaunce === 0) {
      onSearch(inputValue);
      return;
    }
    const debauncer = setTimeout(() => {
      onSearch(inputValue);
    }, defaultTimeout);

    return () => {
      clearTimeout(debauncer);
    };
  }, [inputValue, onSearch]);

  return (
    <div className="search-container">
      <SearchIcon size={20} className="search-icon" />
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

export default Search;
