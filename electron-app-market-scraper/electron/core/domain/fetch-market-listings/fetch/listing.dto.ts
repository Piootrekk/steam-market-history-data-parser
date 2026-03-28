import { getActionsLinks } from "../transforms/actions-links-transform";
import { getTransformedEvent } from "../transforms/event-transform";
import { getGameFromAppId } from "../transforms/game-transform";
import { hashUrlIconToFileName } from "../transforms/hash-storage";
import { setupMarketLink } from "../transforms/market-link";
import { getSelectedCurrecyISO } from "../transforms/steam-currencies";
import { getPrice } from "../transforms/steam-price";
import type { MergeResponse } from "../transforms/summary-all-transforms";

type TransformDto = ReturnType<typeof transformDto>;

const transformDto = (response: MergeResponse) => {
  return response.map((resp) => {
    const actions = getActionsLinks(resp.actions);
    return {
      listingId: resp.listingid,
      purchaseId: resp.purchaseid,
      eventType: resp.event_type,
      eventAction: getTransformedEvent(resp.event_type),
      timeEvent: new Date(resp.time_event * 1000),
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
      marketName: resp.market_name,
      oldAssetId: resp.asset.id,
      newAssetId: resp.asset.new_id,
      iconHashStorage: hashUrlIconToFileName(resp.icon_url),
      urlPageMarket: setupMarketLink(resp.appid, resp.market_hash_name),
      urlPageWorkshop: actions.workshopLink,
      urlPageInspect: actions.inspectLink,
      urlPageWiki: actions.wikiLink,
      itemType: resp.type,
    };
  });
};

export { transformDto };
export type { TransformDto };
