import "./marketHistory.css";
import Search from "@/common/components/Table/Search/Search";
import { Outlet } from "@tanstack/react-router";
import { routeApiMarketHistory } from "../router";
import MarketHistoryEmpty from "./MarketHistoryEmpty";
import ItemFilters from "./Table-Elements/ItemFilters";

const MarketHistoryLayout = () => {
  const navigate = routeApiMarketHistory.useNavigate();
  const { collectionName, games, actions } = routeApiMarketHistory.useSearch();

  if (collectionName === undefined) {
    return <MarketHistoryEmpty />;
  }

  const onSearch = (searchTerms: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        skip: undefined,
        search: searchTerms,
      }),
    });
  };

  const onFiliter = (gameFilter?: string[], actionFilter?: string[]) => {
    navigate({
      search: (prev) => ({
        ...prev,
        actions: actionFilter,
        games: gameFilter,
      }),
    });
  };

  return (
    <div className="transaction-overview">
      <h2 className="overview-title">Transaction in market history</h2>
      <div className="query-container">
        <Search onSearch={onSearch} timeoutDebaunce={600} />
        <ItemFilters onFiliter={onFiliter} games={games} events={actions} />
      </div>
      <div className="table-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MarketHistoryLayout;
