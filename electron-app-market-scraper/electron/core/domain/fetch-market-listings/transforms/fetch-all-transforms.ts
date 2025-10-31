import { getAllCurrentAssets } from "./fetch-assets-transforms";
import type { MarketFetchResponse } from "../fetch.types";

const getSummaryObject = (response: MarketFetchResponse) => {
  const assets = getAllCurrentAssets(response.assets);
  const connectedMarketData = response.events.map((event) => {
    const currentPurchaseProp: `${number}_${number}` = `${event.listingid}_${event.purchaseid}`;
    const currentPurchase = response.purchases[currentPurchaseProp];
    const currentAsset = assets.find(
      (asset) => asset.id === currentPurchase.asset.id
    );
    if (!currentAsset) throw new Error("Invalid asset id");
    return {
      ...event,
      ...currentPurchase,
      ...currentAsset,
    };
  });
  return connectedMarketData;
};

export { getSummaryObject };
