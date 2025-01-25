import TMarketHistoryResponse, {
  TAction,
  TAssetId,
  TEvent,
  TRecordListings,
  TRecordPurchases,
  TVersionApi,
} from "../fetch/fetch.types";
import {
  EventType,
  TEventData,
  TExtendedEventData,
  TItemData,
  TItemDTO,
  TListingsData,
  TListingsInPurchasesData,
  TPurchaseData,
} from "./items.types";

const getFirstAPIVersion = (asset: TVersionApi): TAssetId => {
  const versions = Object.values(asset);
  return versions[0];
};

const summaryPaid = (paidAmount: number, paidFee: number) => {
  const calculatedPaid = (paidAmount + paidFee) / 100;
  return Number(calculatedPaid.toFixed(2));
};

const singlePaid = (originalPrice: number) => {
  const calculatedPaid = (originalPrice / 100).toFixed(2);
  return Number(calculatedPaid);
};

const getActionInspectInGame = (
  actions: TAction[] | undefined
): string | undefined => {
  if (!actions) return undefined;
  const inspectAction = actions.find(
    (action) => action.name === "Inspect in Game..."
  );
  return inspectAction ? inspectAction.link : undefined;
};

const getActionWiki = (actions: TAction[] | undefined): string | undefined => {
  if (!actions) return undefined;
  const wikiLink = actions.find(
    (action) => action.name === "Item Wiki Page..."
  );
  return wikiLink ? wikiLink.link : undefined;
};

const getCorrectEvent = (event: TEvent): TEventData => {
  switch (event.event_type) {
    case EventType.CREATE:
    case EventType.CANCEL:
      return {
        event_type: event.event_type,
        listingid: event.listingid,
        time_event: event.time_event,
        steamid_actor: event.steamid_actor,
        event_action:
          event.event_type === EventType.CREATE ? "Create" : "Cancel",
        purchaseid: undefined as never,
      };

    case EventType.SOLD:
    case EventType.BOUGHT:
      return {
        event_type: event.event_type,
        time_event: event.time_event,
        steamid_actor: event.steamid_actor,
        purchaseid: `${event.listingid}_${event.purchaseid}` as const,
        event_action: event.event_type === EventType.SOLD ? "Sold" : "Bought",
        listingid: event.listingid,
      };

    default:
      throw new Error("Invalid event_type");
  }
};

const fixEventResponse = (
  response: TMarketHistoryResponse
): TExtendedEventData[] => {
  if (response.events === undefined) {
    console.log(response);
  }
  const events = response.events.map((event) => {
    const correctEvent = getCorrectEvent(event);
    if (
      correctEvent.event_type === EventType.CREATE ||
      correctEvent.event_type === EventType.CANCEL
    ) {
      const listing = appendListingCreateAndCancel(
        correctEvent,
        response.listings
      );
      return {
        ...correctEvent,
        ...listing,
      };
    } else if (correctEvent.event_type === EventType.SOLD) {
      const purchaseSold = appendPurchaseSold(correctEvent, response.purchases);
      const listingsInSold = appedListingsInPurchases(
        correctEvent,
        response.listings
      );
      return {
        ...correctEvent,
        ...purchaseSold,
        ...listingsInSold,
      };
    } else if (correctEvent.event_type === EventType.BOUGHT) {
      const purchaseBought = appendPurchaseBought(
        correctEvent,
        response.purchases
      );
      const listingsInPurchase = appedListingsInPurchases(
        correctEvent,
        response.listings
      );
      return {
        ...correctEvent,
        ...purchaseBought,
        ...listingsInPurchase,
      };
    } else throw new Error("Invalid envent type");
  });
  return events;
};

const appedListingsInPurchases = (
  event: TEventData,
  listings: TRecordListings
): TListingsInPurchasesData => {
  const listing = listings[event.listingid];
  return {
    item_id: listing.asset.id,
    appid: listing.asset.appid,
  };
};

const responesConverter = (response: TMarketHistoryResponse): TItemDTO[] => {
  const fixedEvents = fixEventResponse(response);
  const items = fixedEvents.map((event) => {
    const asset = getEventWithAssets(event, response);
    return {
      ...event,
      ...asset,
    };
  });
  return items;
};

const getEventWithAssets = (
  event: TExtendedEventData,
  response: TMarketHistoryResponse
): TItemData => {
  const assetGame = response.assets[event.appid.toString()];
  const apiVersion = getFirstAPIVersion(assetGame);
  const item = apiVersion[event.item_id];
  const itemResponse: TItemData = {
    instanceid: item.instanceid,
    original_amount: item.original_amount,
    background_color: item.background_color,
    icon_url: item.icon_url,
    inspect_in_game_url: getActionInspectInGame(item.actions),
    name_color: item.name_color,
    wiki_page: getActionWiki(item.actions),
    market_hash_name: item.market_hash_name,
  };
  return itemResponse;
};

const appendListingCreateAndCancel = (
  event: TEventData,
  listings: TRecordListings
): TListingsData => {
  const listing = listings[event.listingid];
  return {
    price: singlePaid(listing.original_price),
    item_id: listing.asset.id,
    currency: listing.currencyid,
    appid: listing.asset.appid,
  };
};

const appendPurchaseSold = (
  event: TEventData,
  purchases: TRecordPurchases
): TPurchaseData => {
  const purchase = purchases[event.purchaseid];
  return {
    price: singlePaid(purchase.received_amount),
    currency: Number(purchase.received_currencyid),
  };
};

const appendPurchaseBought = (
  event: TEventData,
  purchases: TRecordPurchases
): TPurchaseData => {
  const purchase = purchases[event.purchaseid];
  return {
    price: summaryPaid(purchase.paid_amount, purchase.paid_fee),
    currency: Number(purchase.currencyid),
  };
};

export { getActionInspectInGame, getActionWiki, fixEventResponse };
export default responesConverter;
