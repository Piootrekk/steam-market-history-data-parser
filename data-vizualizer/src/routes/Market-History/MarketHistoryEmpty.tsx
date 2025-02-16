import { useHistoryCollections } from "@/common/context/MarketHistoryContext";
import { useEffect } from "react";

type MarketHistoryEmptyProps = {};

const MarketHistoryEmpty: React.FC<MarketHistoryEmptyProps> = ({}) => {
  const inventoryCollections = useHistoryCollections();
  useEffect(() => {
    inventoryCollections.refetch();
  }, []);
  if (inventoryCollections.data) {
    return (
      <div className="empty-container">
        <h2 className="empty-title">Market History fetched</h2>
        <div className="empty-colNames">
          {inventoryCollections.data.map((coll) => (
            <p>{coll}</p>
          ))}
        </div>
      </div>
    );
  }
};

export default MarketHistoryEmpty;
