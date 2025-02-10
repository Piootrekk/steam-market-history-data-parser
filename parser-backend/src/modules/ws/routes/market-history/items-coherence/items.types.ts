type TEventDataListing = {
  event_type: 1 | 2;
  listingid: string;
  time_event: number;
  steamid_actor: string;
  purchaseid: never;
};

type TEventDataPurchase = {
  event_type: 3 | 4;
  listingid: string;
  time_event: number;
  steamid_actor: string;
  purchaseid: string;
};

type TEventData = (TEventDataListing | TEventDataPurchase) & {
  event_action: string;
};

type TListingsInPurchasesData = {
  item_id: string;
  appid: number;
};

type TExtendedEventData =
  | (TEventDataListing & TListingsData)
  | (TEventDataPurchase & TPurchaseData & TListingsInPurchasesData);

type TPurchaseData = {
  price: number;
  currency: string;
};

type TListingsData = {
  price: number;
  item_id: string;
  appid: number;
  currency: string;
};

type TItemData = {
  background_color: string;
  icon_url: string;
  market_hash_name: string;
  name_color: string;
  inspect_in_game_url?: string;
  wiki_page?: string;
  original_amount: string;
  instanceid: string;
};

type TItemDTO = TItemData & TExtendedEventData;

enum EventType {
  CREATE = 1,
  CANCEL = 2,
  SOLD = 3,
  BOUGHT = 4,
}

export {
  TEventData,
  TExtendedEventData,
  TListingsData,
  TPurchaseData,
  EventType,
  TItemData,
  TListingsInPurchasesData,
  TItemDTO,
};
