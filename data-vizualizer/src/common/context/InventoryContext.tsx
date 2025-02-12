import { getInventoryHistoryCollectionsName } from "@/api/inventoryHistory";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, use } from "react";

const InventoryCollectionsContext = createContext<
  UseQueryResult<string[], Error> | undefined
>(undefined);

const useInventoryCollections = () => {
  const context = use(InventoryCollectionsContext);
  if (context === undefined)
    throw new Error("InventoryCollectionsContext is undefined");
  return context;
};

type CollectionsProviderProps = {
  children: React.ReactNode;
};

const InventoryCollectionsProvider: React.FC<CollectionsProviderProps> = ({
  children,
}) => {
  const marketHistoryCollectionsName = useQuery<string[]>({
    queryKey: ["inventoryCollectionsName"],
    queryFn: getInventoryHistoryCollectionsName,
  });
  return (
    <InventoryCollectionsContext value={marketHistoryCollectionsName}>
      {children}
    </InventoryCollectionsContext>
  );
};

export default InventoryCollectionsProvider;
export { useInventoryCollections };
