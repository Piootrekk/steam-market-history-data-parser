import { getMarketHistoryCollectionsName } from "@/api/marketHistory";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, use } from "react";

const HistoryCollectionsContext = createContext<
  UseQueryResult<string[], Error> | undefined
>(undefined);

const useHistoryCollections = () => {
  const context = use(HistoryCollectionsContext);
  if (context === undefined)
    throw new Error("HistoryCollectionsContext is undefined");
  return context;
};

type CollectionsProviderProps = {
  children: React.ReactNode;
};

const HistoryCollectionsProvider: React.FC<CollectionsProviderProps> = ({
  children,
}) => {
  const marketHistoryCollectionsName = useQuery<string[]>({
    queryKey: ["marketCollectionsName"],
    queryFn: getMarketHistoryCollectionsName,
  });
  return (
    <HistoryCollectionsContext value={marketHistoryCollectionsName}>
      {children}
    </HistoryCollectionsContext>
  );
};

export default HistoryCollectionsProvider;
export { useHistoryCollections };
