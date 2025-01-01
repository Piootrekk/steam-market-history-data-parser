import TMarketHistoryResponse, {
  TAction,
  TAssetId,
  TEvent,
  TRecordListings,
  TRecordPurchases,
  TVersionApi,
} from "../fetch/fetch.types";
import {
  TEventData,
  TExtendedEventData,
  TListingsData,
  TPurchaseData,
} from "./items.types";

const getGamesProps = (items: TMarketHistoryResponse) => {
  const games = Object.keys(items);
  return games;
};

const getVersion = (asset: TVersionApi): TAssetId => {
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

const getActionInspectInGame = (actions: TAction[]): string | undefined => {
  const inspectAction = actions.find(
    (action) => action.name === "Inspect in Game..."
  );
  return inspectAction ? inspectAction.link : undefined;
};

const getActionWiki = (actions: TAction[]): string | undefined => {
  const wikiLink = actions.find(
    (action) => action.name === "Item Wiki Page..."
  );
  return wikiLink ? wikiLink.link : undefined;
};

const getCorrectEvent = (event: TEvent): TEventData => {
  if (event.event_type === 1 || event.event_type === 2) {
    return {
      event_type: event.event_type,
      listingid: event.listingid,
      time_event: event.time_event,
      steamid_actor: event.steamid_actor,
    } as TEventData;
  } else if (event.event_type === 3 || event.event_type === 4) {
    return {
      event_type: event.event_type,
      time_event: event.time_event,
      steamid_actor: event.steamid_actor,
      purchaseid: `${event.listingid}_${event.purchaseid}` as const,
    } as TEventData;
  } else throw new Error("Invalid event_type");
};

const fixEvents = (response: TMarketHistoryResponse): TExtendedEventData[] => {
  const events = response.events.map((event) => {
    const correctEvent = getCorrectEvent(event);
    if (correctEvent.event_type === 1 || correctEvent.event_type === 2) {
      const listing = appendListingCreateAndCancel(
        correctEvent,
        response.listings
      );
      return {
        ...correctEvent,
        ...listing,
      };
    } else if (correctEvent.event_type === 3) {
      const purchaseSold = appendPurchaseSold(correctEvent, response.purchases);
      return {
        ...correctEvent,
        ...purchaseSold,
      };
    } else {
      const purchaseBought = appendPurchaseBought(
        correctEvent,
        response.purchases
      );
      return {
        ...correctEvent,
        ...purchaseBought,
      };
    }
  });
  return events;
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
  };
};

const appendPurchaseSold = (
  event: TEventData,
  purchases: TRecordPurchases
): TPurchaseData => {
  const purchase = purchases[event.purchaseid];
  return {
    time_transaction: purchase.time_sold,
    steamid_purchaser: purchase.steamid_purchaser,
    price: singlePaid(purchase.received_amount),
    item_id: purchase.asset.id,
    currency: Number(purchase.received_currencyid),
  };
};

const appendPurchaseBought = (
  event: TEventData,
  purchases: TRecordPurchases
): TPurchaseData => {
  const purchase = purchases[event.purchaseid];
  return {
    time_transaction: purchase.time_sold,
    steamid_purchaser: purchase.steamid_purchaser,
    price: summaryPaid(purchase.paid_amount, purchase.paid_fee),
    item_id: purchase.asset.id,
    currency: Number(purchase.currencyid),
  };
};

export {
  getGamesProps,
  getVersion,
  getActionInspectInGame,
  getActionWiki,
  fixEvents,
};
