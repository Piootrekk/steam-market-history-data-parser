import { Columns3, Filter } from "lucide-react";
import { useState } from "react";
import Button from "../../primitives/button";

const TableFiltersTab = () => {
  const [showColumnsFilter, setShowColumnsFilter] = useState<boolean>(false);
  const [showSearchQueries, setShowSearchQueries] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="mx-2 flex items-center gap-2">
        <Button
          variant={showSearchQueries ? "default" : "ghost"}
          onClick={() => setShowSearchQueries(!showSearchQueries)}
        >
          <Filter className="h-4 w-4 shrink-0" />
          <span className="block truncate">{"Search"}</span>
        </Button>
        <Button
          variant={showColumnsFilter ? "default" : "ghost"}
          onClick={() => setShowColumnsFilter(!showColumnsFilter)}
        >
          <Columns3 className="h-4 w-4 shrink-0" />
          <span className="block truncate">{"Columns"}</span>
        </Button>
      </div>
    </div>
  );
};

export { TableFiltersTab };
