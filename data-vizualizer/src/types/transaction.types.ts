type TTransaction = {
  _id: string;
  event_type: 1 | 2 | 3 | 4;
  time_event: number;
  steamid_actor: string;
  purchaseid: string;
  event_action: "Bought" | "Sold" | "Create" | "Cancel";
  listingid: string;
  price: number;
  currency: string;
  item_id: string;
  appid: number;
  instanceid: string;
  original_amount: string;
  background_color: string;
  icon_url: string;
  name_color: string;
  wiki_page?: string;
  inspect_in_game_url?: string;
  market_hash_name: string;
};

export type { TTransaction };
