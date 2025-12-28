import { getAllCurrentAssets } from "./assets-transforms";
import type { MarketFetchResponse } from "../raw-fetch-response.types";

type MergeResponse = ReturnType<typeof mergeResponse>;

const mergeResponse = (response: MarketFetchResponse) => {
  const assets = getAllCurrentAssets(response.assets);
  const connectedMarketData = response.events.map((event) => {
    const currentPurchaseProp: `${number}_${number}` = `${event.listingid}_${event.purchaseid}`;
    const currentPurchase = response.purchases[currentPurchaseProp];
    const currentAsset = assets.find((asset) => {
      return asset.unowned_id === currentPurchase.asset.id;
    });
    if (!currentAsset) throw new Error("Invalid asset id");
    return {
      ...event,
      ...currentPurchase,
      ...currentAsset,
    };
  });
  return connectedMarketData;
};

export { mergeResponse };
export type { MergeResponse };
