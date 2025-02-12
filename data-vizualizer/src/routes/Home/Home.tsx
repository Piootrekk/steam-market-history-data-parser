import "./home.css";
import AllHistoryMarket from "./Sections/AllHistoryMarket";
import AllHistoryInventory from "./Sections/AllHistoryInventory";
import SynchronizeHistoryMarket from "./Sections/SynchronizeHistoryMarket";
import SynchronizeHistoryInventory from "./Sections/SynchronizeHistoryInventory";
import useWebSocket from "@/common/hooks/useWebSocket";
import { TWsRecievedFromServer } from "@/api/types/ws.types";
import { useHistoryCollections } from "@/common/context/MarketHistoryContext";
import { useInventoryCollections } from "@/common/context/InventoryContext";

type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const marketHistoryCollectionsName = useHistoryCollections();
  const inventoryHistoryCollectionsName = useInventoryCollections();

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
          isLoadingButton={websocket.disableButton}
          webSocketAction={websocket.connect}
        />
        <AllHistoryInventory disableButton={websocket.disableButton} />
        <SynchronizeHistoryMarket
          isLoadingButton={websocket.disableButton}
          marketHistoryCollectionsName={marketHistoryCollectionsName.data}
          webSocketAction={websocket.connect}
        />
        <SynchronizeHistoryInventory
          inventoryHistoryCollectionsName={inventoryHistoryCollectionsName.data}
          isLoadingButton={websocket.disableButton}
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
