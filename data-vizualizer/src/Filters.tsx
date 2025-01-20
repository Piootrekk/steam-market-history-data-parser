import { useEffect, useState } from "react";
import SearchIcon from "./common/icons/SearchIcon";
import { TTransaction } from "./types/transaction.types";

type FiltersProps = {
  onSearch: (searchTerm: string) => void;
  selectedEvents: TTransaction["event_action"][];
  onEventToggle: (event: TTransaction["event_action"]) => void;
  selectedGames: string[];
  onGameToggle: (game: string) => void;
};

const Filters: React.FC<FiltersProps> = ({
  onSearch,
  selectedEvents,
  onEventToggle,
  selectedGames,
  onGameToggle,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onSearch]);

  const allEvents: TTransaction["event_action"][] = [
    "Bought",
    "Cancel",
    "Sold",
    "Create",
  ];
  const allGames: string[] = ["252490", "730", "440", "others"];
  return (
    <div className="filter-container">
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
      <div className="event-filters">
        <span className="filter-label">Filter by event:</span>
        <div className="checkbox-group">
          {allEvents.map((event) => (
            <label key={event} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedEvents.includes(event)}
                onChange={() => onEventToggle(event)}
                className="checkbox-input"
              />
              <span>{event}</span>
            </label>
          ))}
        </div>
        <span className="filter-label">Filter by game:</span>
        <div className="checkbox-group">
          {allGames.map((game) => (
            <label key={game} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedGames.includes(game)}
                onChange={() => onGameToggle(game)}
                className="checkbox-input"
              />
              <span>{game}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
