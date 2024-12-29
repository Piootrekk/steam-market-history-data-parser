type TItemsDTO = TAssetData & TEventData & TListingsData;

type TAssetData = {
  _id: string;
  market_hash_name: string;
  appid: string;
  icon_url: string;
  amount: number;
  action_inspect_in_game?: string;
  action_wiki_link?: string;
  background_color: string;
  name_color: string;
  classid: string;
  instanceid: string;
};

type TEventData = {
  _listingid: string;
  event_type: number;
  event_time: number;
};

type TListingsData = {
  _listingid: string;
  _id: string;
  price: number;
  currencyid: string;
};

enum EventType {
  CREATE = 1,
  CANCEL = 2,
  SOLD = 3,
  BOUGHT = 4,
}
