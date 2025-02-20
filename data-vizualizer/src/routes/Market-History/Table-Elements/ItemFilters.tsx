import { useEffect, useState } from "react";
import Filters from "@common/components/Table/Filters/Filters";
import type { TItemFilter } from "@/common/components/Table/Filters/Filters";

type ItemFiltersProps = {
  onFiliter: (gameFilter?: string[], actionFilter?: string[]) => void;
  games?: string[];
  events?: string[];
};

const ItemFilters: React.FC<ItemFiltersProps> = ({
  onFiliter,
  games: initialGames,
  events: initialEvents,
}) => {
  const [events, setEvents] = useState<TItemFilter[]>([
    {
      label: "Bought",
      isChecked:
        initialGames === undefined ? true : initialGames.includes("Bought"),
    },
    {
      label: "Cancel",
      isChecked:
        initialGames === undefined ? true : initialGames.includes("Cancel"),
    },
    {
      label: "Sold",
      isChecked:
        initialGames === undefined ? true : initialGames.includes("Sold"),
    },
    {
      label: "Create",
      isChecked:
        initialGames === undefined ? true : initialGames.includes("Create"),
    },
  ]);

  const [games, setGames] = useState<TItemFilter[]>([
    {
      label: "252490",
      isChecked:
        initialEvents === undefined ? true : initialEvents.includes("252490"),
    },
    {
      label: "730",
      isChecked:
        initialEvents === undefined ? true : initialEvents.includes("730"),
    },
    {
      label: "440",
      isChecked:
        initialEvents === undefined ? true : initialEvents.includes("440"),
    },
    {
      label: "Others",
      isChecked:
        initialEvents === undefined ? true : initialEvents.includes("Others"),
    },
  ]);

  useEffect(() => {
    const isEveryEventsOn = events.every((event) => event.isChecked);
    const isEveryGamgeOn = games.every((game) => game.isChecked);
    const eventsToPush = isEveryEventsOn
      ? undefined
      : events.filter((event) => event.isChecked).map((event) => event.label);
    const gamesToPush = isEveryGamgeOn
      ? undefined
      : games.filter((game) => game.isChecked).map((game) => game.label);
    onFiliter(gamesToPush, eventsToPush);
  }, [events, games]);

  const toggleEvent = (label: string) => {
    setEvents((prev) => {
      const checkedCount = prev.filter((item) => item.isChecked).length;

      return prev.map((item) => {
        if (item.label === label) {
          if (item.isChecked && checkedCount === 1) {
            return item;
          }
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      });
    });
  };

  const toggleGame = (label: string) => {
    setGames((prev) => {
      const checkedCount = prev.filter((item) => item.isChecked).length;

      return prev.map((item) => {
        if (item.label === label) {
          if (item.isChecked && checkedCount === 1) {
            return item;
          }
          return { ...item, isChecked: !item.isChecked };
        }
        return item;
      });
    });
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
