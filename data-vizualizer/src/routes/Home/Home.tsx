import { useQuery } from "@tanstack/react-query";
import "./home.css";
import { getMarketHistoryCollectionsName } from "@/api/marketHistory";
import { getInventoryHistoryCollectionsName } from "@/api/inventoryHistory";
import AllHistoryMarket from "./Sections/AllHistoryMarket";
import AllHistoryInventory from "./Sections/AllHistoryInventory";
import SynchronizeHistoryMarket from "./Sections/SynchronizeHistoryMarket";
import SynchronizeHistoryInventory from "./Sections/SynchronizeHistoryInventory";
import useWebSocket from "@/common/hooks/useWebSocket";
import { TWsRecievedFromServer } from "@/api/types/ws.types";

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

  const websocket = useWebSocket<TWsRecievedFromServer>();
  const progress = websocket.response
    ? (websocket.response.currentFetch / websocket.response.allFetches) * 100
    : 0;

  if (
    marketHistoryCollectionsName.error ||
    marketHistoryCollectionsName.data === undefined
  ) {
    return;
  }

  if (
    inventoryHistoryCollectionsName.error ||
    inventoryHistoryCollectionsName.data === undefined
  ) {
    return;
  }

  return (
    <>
      <div className="sections-container">
        <AllHistoryMarket
          disableButton={websocket.disableButton}
          webSocketAction={websocket.connect}
        />
        <AllHistoryInventory disableButton={websocket.disableButton} />
        <SynchronizeHistoryMarket
          disableButton={websocket.disableButton}
          marketHistoryCollectionsName={marketHistoryCollectionsName.data}
        />
        <SynchronizeHistoryInventory
          inventoryHistoryCollectionsName={inventoryHistoryCollectionsName.data}
          disableButton={websocket.disableButton}
        />
      </div>
      {websocket.error && (
        <div className="response-section error">
          <h2>{websocket.error || "FAILED TO ESTABLISH CONNECTION"}</h2>
        </div>
      )}

      {websocket.response !== undefined && (
        <div className="response-section">
          <h2>
            CLIENT IS FETCHING HISTORY, DON'T CLOSE THE BROWSER TAB UNTIL END
          </h2>
          <p
            style={
              {
                "--progress": `${progress}%`,
              } as React.CSSProperties
            }
          >
            {websocket.response.currentFetch} / {websocket.response.allFetches}
          </p>
        </div>
      )}
      {websocket.closeMessage && (
        <div className="response-section">
          <h2>{websocket.closeMessage || "CONNECTION CLOSE"}</h2>
        </div>
      )}
    </>
  );
};

export default Home;
