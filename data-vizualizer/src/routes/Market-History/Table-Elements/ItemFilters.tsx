import { useState } from "react";
import Filters from "@common/components/Table/Filters/Filters";
import type { TItemFilter } from "@/common/components/Table/Filters/Filters";

const ItemFilters = () => {
  const [events, setEvents] = useState<TItemFilter[]>([
    { label: "Bought", isChecked: true },
    { label: "Cancel", isChecked: true },
    { label: "Sold", isChecked: true },
    { label: "Create", isChecked: true },
  ]);

  const [games, setGames] = useState<TItemFilter[]>([
    { label: "252490", isChecked: true },
    { label: "730", isChecked: true },
    { label: "440", isChecked: true },
    { label: "Others", isChecked: true },
  ]);

  const toggleEvent = (label: string) => {
    setEvents((prev) =>
      prev.map((item) =>
        item.label === label ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const toggleGame = (label: string) => {
    setGames((prev) =>
      prev.map((item) =>
        item.label === label ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  return (
    <div>
      <Filters
        groups={[
          { title: "Filter by Event:", items: events, onHandler: toggleEvent },
          { title: "Filter by Game:", items: games, onHandler: toggleGame },
        ]}
      />
    </div>
  );
};

export default ItemFilters;
