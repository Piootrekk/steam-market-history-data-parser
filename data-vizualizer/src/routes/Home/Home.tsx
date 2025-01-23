import { useQuery } from "@tanstack/react-query";
import "./home.css";
import { getMarketHistoryCollectionsName } from "@/api/marketHistory";
import { getInventoryHistoryCollectionsName } from "@/api/inventoryHistory";
import AllHistoryMarket from "./Sections/AllHistoryMarket";
import AllHistoryInventory from "./Sections/AllHistoryInventory";
import SynchronizeHistoryMarket from "./Sections/SynchronizeHistoryMarket";
import SynchronizeHistoryInventory from "./Sections/SynchronizeHistoryInventory";
type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const marketHistoryCollectionsName = useQuery<string[]>({
    queryKey: ["marketCollectionsName"],
    queryFn: getMarketHistoryCollectionsName,
  });
  const inventoryHistoryCollectionsName = useQuery<string[]>({
    queryKey: ["inventoryCollectionsName"],
    queryFn: getInventoryHistoryCollectionsName,
  });

  if (
    marketHistoryCollectionsName.error ||
    marketHistoryCollectionsName.data === undefined
  ) {
    return <h2>ERROR FETCH Market history </h2>;
  }

  if (
    inventoryHistoryCollectionsName.error ||
    inventoryHistoryCollectionsName.data === undefined
  ) {
    return <h2>ERROR FETCH Inv history</h2>;
  }

  return (
    <div className="sections-container">
      <AllHistoryMarket />
      <AllHistoryInventory />
      <SynchronizeHistoryMarket
        marketHistoryCollectionsName={marketHistoryCollectionsName.data}
      />
      <SynchronizeHistoryInventory
        inventoryHistoryCollectionsName={inventoryHistoryCollectionsName.data}
      />
    </div>
  );
};

export default Home;
