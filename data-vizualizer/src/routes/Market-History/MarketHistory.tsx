import "./marketHistory.css";

import { useHistoryCollections } from "@/common/context/MarketHistoryContext";
import { useEffect } from "react";
import { routeApiMarketHistory } from "../router";
import { useQuery } from "@tanstack/react-query";
import { getDocument } from "@/api/marketHistory";
import TableMarketHistory from "./Table-Elements/TableMarketHistory";
import type { TDocuments } from "@/api/marketHistory";
import TablePagination from "@/common/components/Table/Pagination";

type MarketHistoryProps = {};

const MarketHistory: React.FC<MarketHistoryProps> = ({}) => {
  const inventoryCollections = useHistoryCollections();
  const { skip, limit, collectionName, search } =
    routeApiMarketHistory.useSearch();

  const navigate = routeApiMarketHistory.useNavigate();

  const docs = useQuery<TDocuments>({
    queryKey: ["document", collectionName, skip, search],
    queryFn: () => getDocument(collectionName, skip, limit, search),
  });

  useEffect(() => {
    inventoryCollections.refetch();
  }, []);

  const onPageChange = (skipElements: number) => {
    navigate({
      search: (perv) => ({
        ...perv,
        skip: skipElements !== 0 ? skipElements : undefined,
      }),
    });
  };

  if (docs.data) {
    return (
      <div className="transaction-overview">
        <div className="table-container">
          <TableMarketHistory items={docs.data.items} />
          <TablePagination
            totalCount={docs.data.total_count}
            skip={skip ? skip : undefined}
            limit={limit ? limit : undefined}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    );
  }

  return <div>MarketHistory</div>;
};

export default MarketHistory;
