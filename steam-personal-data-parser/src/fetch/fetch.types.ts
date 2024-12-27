type TMarketHistoryResponse = {
  success: boolean;
  pagesize: number;
  total_count: number;
  start: number;
  asstets: TRecordGameId;
  events: TEvent[];
  purchases: TRecordPurchases;
  listings: TRecordListings;
};

type TRecordGameId = Record<string, TVersionApi>;
type TVersionApi = Record<string, TItemId>;
type TItemId = Record<string, TId>;
type TId = {
  currency: number;
  appid: number;
  contextid: string;
  id: string;
  classid: string;
  instanceid: string;
  amount: string;
  status: number;
  original_amopunt: string;
  unowned_contextid: string;
  background_color: string;
  icon_url: string;
  descriptions: TDescription[];
  tradable: number;
  actions: any;
  name: string;
  name_color: string;
  type: string;
  market_name: string;
  market_hash_name: string;
  market_actions: any;
  commodity: number;
  market_tradable_restriction: number;
  market_marketable_restriction: number;
  marketable: number;
  app_icon: string;
  owner: number;
};
type TDescription = {
  type: string;
  value: string;
  name: string;
};
type TEvent = {
  listingid: string;
  purchaseid: string;
  event_type: number;
  time_event: number;
  time_event_fraction: number;
  steamid_actor: string;
  date_event: string;
};

type TRecordPurchases = Record<string, TPurchase>;

type TPurchase = Record<string, TIdPurchase>;

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
