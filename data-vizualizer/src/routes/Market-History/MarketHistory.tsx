import { useHistoryCollections } from "@/common/context/MarketHistoryContext";
import { useEffect } from "react";

type MarketHistoryProps = {};

const MarketHistory: React.FC<MarketHistoryProps> = ({}) => {
  const inventoryCollections = useHistoryCollections();

  useEffect(() => {
    inventoryCollections.refetch();
  }, []);

  return <div>MarketHistory</div>;
};

export default MarketHistory;
