import "./marketHistory.css";
import Search from "@/common/components/Table/Search/Search";
import { Outlet } from "@tanstack/react-router";
import { routeApiMarketHistory } from "../router";
import MarketHistoryEmpty from "./MarketHistoryEmpty";

const MarketHistoryLayout = () => {
  const navigate = routeApiMarketHistory.useNavigate();
  const { collectionName } = routeApiMarketHistory.useSearch();

  if (collectionName === undefined) {
    return <MarketHistoryEmpty />;
  }

  const onSearch = (searchTerms: string) => {
    navigate({
      search: (perv) => ({
        ...perv,
        skip: undefined,
        search: searchTerms,
      }),
    });
  };

  return (
    <div className="transaction-overview">
      <h2 className="overview-title">Transaction in market history</h2>
      <Search onSearch={onSearch} timeoutDebaunce={600} />
      <div className="table-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MarketHistoryLayout;
