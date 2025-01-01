type TEventDataListing = {
  event_type: 1 | 2;
  listingid: string;
  time_event: number;
  steamid_actor: string;
  purchaseid: never;
};

type TEventDataPurchase = {
  event_type: 3 | 4;
  listingid: never;
  time_event: number;
  steamid_actor: string;
  purchaseid: string;
};

type TEventData = TEventDataListing | TEventDataPurchase;

type TExtendedEventData =
  | (TEventDataListing & TListingsData)
  | (TEventDataPurchase & TPurchaseData);

type TPurchaseData = {
  time_transaction: number;
  steamid_purchaser: string;
  price: number;
  item_id: string;
  currency: number;
};

type TListingsData = {
  price: number;
  item_id: string;
  currency: number;
};

enum EventType {
  CREATE = 1,
  CANCEL = 2,
  SOLD = 3,
  BOUGHT = 4,
}

export { TEventData, TExtendedEventData, TListingsData, TPurchaseData };
