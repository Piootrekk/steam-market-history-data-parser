import { getTransformedEvent } from "../transforms/event-transform";
import { getGameFromAppId } from "../transforms/game-transform";
import { hashUrlIconToFileName } from "../transforms/hash-storage";
import { getSelectedCurrecyISO } from "../transforms/steam-currencies";
import { getPrice } from "../transforms/steam-price";
import type { MergeResponse } from "../transforms/summary-all-transforms";

type TransformDto = ReturnType<typeof transformDto>;

const transformDto = (response: MergeResponse) => {
  return response.map((resp) => {
    return {
      listingId: resp.listingid,
      purchaseId: resp.purchaseid,
      eventType: resp.event_type,
      eventAction: getTransformedEvent(resp.event_type),
      timeEvent: resp.time_event,
      steamidActor: resp.steamid_actor,
      appId: resp.appid,
      game: getGameFromAppId(resp.appid),
      price: getPrice(
        resp.event_type,
        resp.paid_amount,
        resp.paid_fee,
        resp.received_amount,
      ),
      currency: getSelectedCurrecyISO(
        resp.event_type,
        resp.currencyid,
        resp.received_currencyid,
      ),
      instanceId: resp.instanceid,
      classId: resp.classid,
      originalAmount: resp.asset.amount,
      backgroundColor: resp.background_color,
      urlIcon: resp.icon_url,
      nameColor: resp.name_color,
      marketHashName: resp.market_hash_name,
      oldAssetId: resp.asset.id,
      newAssetId: resp.asset.new_id,
      iconHashStorage: hashUrlIconToFileName(resp.icon_url),
    };
  });
};

export { transformDto };
export type { TransformDto };
