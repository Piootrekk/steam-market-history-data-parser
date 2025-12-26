import { getTransformedEvent } from "./event-transform";
import { getGameFromAppId } from "./game-transform";
import { getSelectedCurrecyISO } from "./steam-currencies";
import { getPrice } from "./steam-price";
import type { MergeResponse } from "./summary-all-transforms";

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
      app: getGameFromAppId(resp.appid),
      price: getPrice(
        resp.event_type,
        resp.paid_amount,
        resp.paid_fee,
        resp.received_amount
      ),
      currency: getSelectedCurrecyISO(
        resp.event_type,
        resp.currencyid,
        resp.received_currencyid
      ),
      instanceId: resp.instanceid,
      classId: resp.classid,
      originalAmount: resp.asset.amount,
      backgroundColor: resp.background_color,
      urlIcon: resp.icon_url,
      nameColor: resp.name_color,
      marketHashName: resp.market_hash_name,
    };
  });
};

export { transformDto };
