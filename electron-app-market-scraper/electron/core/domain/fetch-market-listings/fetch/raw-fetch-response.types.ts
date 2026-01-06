type MarketRawResponse = IncorrectMarketFetchResponse | MarketFetchResponse;

type IncorrectMarketFetchResponse = {
  success: boolean;
  start: number;
  total_count: 0;
  listings: false;
  assets: [];
  events: undefined;
};

type MarketFetchResponse = {
  success: boolean;
  pagesize: number;
  total_count: number;
  start: number;
  assets: Assets;
  events: Event[];
  purchases: Purchases;
  listings: Listings;
};

type Assets = Record<
  GameId,
  Record<VersionApiId, Record<ItemId, CurrentAsset>>
>;

type GameId = `${number}`;
type VersionApiId = `${number}`;
type ItemId = `${number}`;

type CurrentAsset = {
  currency: number;
  appid: number;
  contextid: `${number}`;
  id: `${number}`;
  classid: `${number}`;
  instanceid: `${number}`;
  amount: `${number}`;
  status: number;
  original_amount: `${number}`;
  unowned_id: `${number}`;
  unowned_contextid: `${number}`;
  background_color: string;
  icon_url: string;
  descriptions: AssetDesc[];
  tradable: number;
  actions?: AssetAction[];
  name: string;
  name_color: string;
  type: string;
  market_name: string;
  market_hash_name: string;
  market_actions: AssetAction[];
  commodity: number;
  market_tradable_restriction: number;
  market_marketable_restriction: number;
  marketable: number;
  sealed: number;
  app_icon: string;
  owner: number;
};

type AssetDesc = {
  type: string;
  value: string;
  color: string;
  name: string;
};

type AssetAction = {
  link: string;
  name: string;
};

type Event = {
  listingid: `${number}`;
  purchaseid: `${number}`;
  event_type: number;
  time_event: number;
  time_event_fraction: number;
  steamid_actor: `${number}`;
  date_event: string;
};

type Purchases = Record<`${number}_${number}`, CurrentPurchase>;
type CurrentPurchase = {
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
  currencyid: `${number}`;
  steam_fee: number;
  publisher_fee: number;
  publisher_fee_percent: string;
  publisher_fee_app: number;
  received_amount: number;
  received_currencyid: `${number}`;
  funds_held: number;
  time_funds_held_until: number;
  funds_revoked: number;
  funds_returned: number;
  added_tax: number;
};

type Listings = Record<`${number}`, CurrentListing>;
type CurrentListing = {
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
    market_actions: AssetAction[];
  };
  original_price: number;
};

export type {
  MarketFetchResponse,
  IncorrectMarketFetchResponse,
  Assets,
  CurrentAsset,
  MarketRawResponse,
};
