import "./home.css";
import AllHistoryMarket from "./Sections/AllHistoryMarket";
import AllHistoryInventory from "./Sections/AllHistoryInventory";
import SynchronizeHistoryMarket from "./Sections/SynchronizeHistoryMarket";
import SynchronizeHistoryInventory from "./Sections/SynchronizeHistoryInventory";
import useWebSocket from "@/common/hooks/useWebSocket";
import { TWsRecievedFromServer } from "@/api/types/ws.types";
import { useHistoryCollections } from "@/common/context/MarketHistoryContext";
import { useInventoryCollections } from "@/common/context/InventoryContext";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const marketHistoryCollectionsNames = useHistoryCollections();
  const inventoryHistoryCollectionsNames = useInventoryCollections();
  const [collName, setCollName] = useState<string>("");
  const websocket = useWebSocket<TWsRecievedFromServer>({
    onCloseAction: () => {
      marketHistoryCollectionsNames.refetch();
    },
  });
  const progress = websocket.response
    ? (websocket.response.currentFetch / websocket.response.allFetches) * 100
    : 0;

  if (
    marketHistoryCollectionsNames.error ||
    marketHistoryCollectionsNames.data === undefined
  ) {
    return;
  }

  if (
    inventoryHistoryCollectionsNames.error ||
    inventoryHistoryCollectionsNames.data === undefined
  ) {
    return;
  }

  return (
    <>
      <div className="sections-container">
        <AllHistoryMarket
          isLoadingButton={websocket.disableButton}
          webSocketAction={websocket.connect}
          setColName={setCollName}
        />
        <AllHistoryInventory
          disableButton={websocket.disableButton}
          setColName={setCollName}
        />
        <SynchronizeHistoryMarket
          isLoadingButton={websocket.disableButton}
          marketHistoryCollectionsName={marketHistoryCollectionsNames.data}
          webSocketAction={websocket.connect}
          setColName={setCollName}
        />
        <SynchronizeHistoryInventory
          inventoryHistoryCollectionsName={
            inventoryHistoryCollectionsNames.data
          }
          isLoadingButton={websocket.disableButton}
          setColName={setCollName}
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
          <h3>Fetching... {collName}</h3>
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
        <div className="response-section success">
          <h2>{websocket.closeMessage || "CONNECTION CLOSE"}</h2>
          <Link
            className="route-link"
            to="/market-history"
            search={{ collectionName: collName }}
          >
            {collName}
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
