import "./marketHistory.css";

import { useHistoryCollections } from "@/common/context/MarketHistoryContext";
import { useEffect } from "react";
import { routeApiMarketHistory } from "../router";
import { useQuery } from "@tanstack/react-query";
import { getDocument, TDocuments } from "@/api/marketHistory";
import TableMarketHistory from "./Table-Elements/TableMarketHistory";

type MarketHistoryProps = {};

const MarketHistory: React.FC<MarketHistoryProps> = ({}) => {
  const inventoryCollections = useHistoryCollections();
  const { skip, limit, collectionName, search } =
    routeApiMarketHistory.useSearch();

  const docs = useQuery<TDocuments>({
    queryKey: ["document", collectionName, skip, search],
    queryFn: () => getDocument(collectionName, skip, limit, search),
  });

  useEffect(() => {
    inventoryCollections.refetch();
  }, []);

  if (docs.data) {
    return (
      <div className="transaction-overview">
        <div className="table-container">
          <TableMarketHistory items={docs.data.items} />
        </div>
      </div>
    );
  }

  return <div>MarketHistory</div>;
};

export default MarketHistory;
