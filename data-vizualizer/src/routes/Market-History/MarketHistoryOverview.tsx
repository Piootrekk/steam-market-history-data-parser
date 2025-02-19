import { routeApiMarketHistory } from "../router";
import { useQuery } from "@tanstack/react-query";
import { getDocument } from "@/api/marketHistory";
import TableMarketHistory from "./Table-Elements/TableMarketHistory";
import type { TDocuments } from "@/api/marketHistory";
import TablePagination from "@/common/components/Table/Pagination/Pagination";
import TableSkeleton from "./TableSkeleton";

type MarketHistoryOverviewProps = {};
const MarketHistoryOverview: React.FC<MarketHistoryOverviewProps> = ({}) => {
  const { skip, limit, collectionName, search, actions, games } =
    routeApiMarketHistory.useSearch();

  const navigate = routeApiMarketHistory.useNavigate();
  const baseLoadingAmount = 30;

  const docs = useQuery<TDocuments>({
    queryKey: ["document", collectionName, skip, search, actions, games],
    queryFn: () =>
      getDocument(collectionName!, skip, limit, search, actions, games),
  });

  const onPageChange = (skipElements: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        skip: skipElements !== 0 ? skipElements : undefined,
      }),
    });
  };

  if (docs.isLoading || docs.data === undefined) {
    return (
      <div className="market-loading">
        <TableSkeleton amount={limit || baseLoadingAmount} />
      </div>
    );
  }

  if (docs.data) {
    return (
      <>
        <TableMarketHistory items={docs.data.items} />
        <TablePagination
          totalCount={docs.data.total_count}
          skipElements={skip ? skip : undefined}
          limitElements={limit ? limit : undefined}
          onPageChange={onPageChange}
        />
      </>
    );
  }
};

export default MarketHistoryOverview;
