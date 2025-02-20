import { useHistoryCollections } from "@/common/context/MarketHistoryContext";
import DatabaseIcon from "@/common/icons/DatabaseIcon";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

type MarketHistoryEmptyProps = {};

const MarketHistoryEmpty: React.FC<MarketHistoryEmptyProps> = ({}) => {
  const inventoryCollections = useHistoryCollections();

  useEffect(() => {
    inventoryCollections.refetch();
  }, [inventoryCollections]);

  if (inventoryCollections.data) {
    return (
      <div className="empty-container">
        <h2 className="empty-title">Market History fetched</h2>
        <div className="empty-colNames">
          {inventoryCollections.data.length > 0 &&
            inventoryCollections.data.map((coll) => (
              <Link
                to="."
                search={{
                  collectionName: coll,
                }}
                className="empty-fetched"
                key={coll}
              >
                <DatabaseIcon size={16} className="badge-icon" />
                <span key={coll}>{coll}</span>
              </Link>
            ))}
          {inventoryCollections.data.length === 0 && (
            <p className="empty-no-items">No fetches found...</p>
          )}
        </div>
      </div>
    );
  }
};

export default MarketHistoryEmpty;
