type TMarketHistoryResponse = {
  success: boolean;
  pagesize: number;
  total_count: number;
  start: number;
  assets: TRecordGameId;
  events: TEvent[];
  purchases: TRecordPurchases;
  listings: TRecordListings;
};

type TRecordGameId = Record<string, TVersionApi>;
type TVersionApi = Record<string, TAssetId>;
type TAssetId = Record<string, TItemId>;
type TItemId = {
  currency: number;
  appid: number;
  contextid: string;
  id: string;
  classid: string;
  instanceid: string;
  amount: string;
  status: number;
  original_amount: string;
  unowned_contextid?: string;
  background_color: string;
  unowned_id?: "40901219093";
  icon_url: string;
  icon_url_large?: string;
  descriptions: TDescription[];
  tradable: number;
  actions: TAction[];
  name: string;
  name_color: string;
  type: string;
  market_name: string;
  market_hash_name: string;
  market_actions: never;
  commodity: number;
  market_tradable_restriction: number;
  market_marketable_restriction: number;
  marketable: number;
  app_icon: string;
  owner: number;
};

type TAction = {
  link: string;
  name: string;
};

type TDescription = {
  type?: string;
  value?: string;
  name?: string;
};
type TEvent = {
  listingid: string;
  purchaseid?: string;
  event_type: 1 | 2 | 3 | 4;
  time_event: number;
  time_event_fraction: number;
  steamid_actor: string;
  date_event: string;
};

type TRecordPurchases = Record<string, TIdPurchase>;

type TIdPurchase = {
  listingid: string;
  purchaseid: string;
  time_sold: number;
  steamid_purchaser: string;
  needs_rollback: number;
  failed: number;
  asset: {
    currency: number;
    appid: number;
    contextid: string;
    id: string;
    classid: string;
    instanceid: string;
    amount: string;
    status: number;
    new_id: string;
    new_contextid: string;
  };
  paid_amount: number;
  paid_fee: number;
  currencyid: string;
  steam_fee: number;
  publisher_fee: number;
  publisher_fee_percent: string;
  publisher_fee_app: number;
  received_amount: number;
  received_currencyid: string;
  funds_held: number;
  time_funds_held_until: number;
  funds_revoked: number;
  funds_returned: number;
  added_tax: number;
};

type TRecordListings = Record<string, TListings>;

type TListings = {
  listingid: string;
  price: number;
  fee: number;
  publisher_fee_app: number;
  publisher_fee_percent: string;
  currencyid: number;
  asset: {
    currency: number;
    appid: number;
    contextid: string;
    id: string;
    amount: string;
    market_actions: any;
  };
  original_price: number;
};

export default TMarketHistoryResponse;
export {
  TAction,
  TDescription,
  TEvent,
  TVersionApi,
  TIdPurchase,
  TItemId,
  TListings,
  TAssetId,
  TRecordPurchases,
  TRecordListings,
};
