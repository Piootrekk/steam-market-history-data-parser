import "./tableMarketHistory.css";

import { TDocuments } from "@/api/marketHistory";
import Table from "@/common/components/Table/Table";
import type { TColumn } from "@/common/components/Table/Table";
import ItemActions from "./ItemActions";
import ItemCurrentPrice from "./ItemCurrentPrice";
type TableMarketHistoryProps = {
  items: TDocuments["items"];
};

type TItem = TDocuments["items"][0];

const TableMarketHistory: React.FC<TableMarketHistoryProps> = ({ items }) => {
  const columns: TColumn<TItem>[] = [
    {
      name: "Action",
      render: (item: TItem) => item.event_action,
    },
    {
      name: "Icon",
      render: (item: TItem) => (
        <img
          src={`${item.icon_url}`}
          alt={item.market_hash_name}
          className="transaction-icon"
        />
      ),
    },
    {
      name: "Name",
      render: (item: TItem) => item.market_hash_name,
    },
    {
      name: "Price",
      render: (item: TItem) => `${item.price} ${item.currency}`,
    },
    {
      name: "Amount",
      render: (item: TItem) => item.original_amount,
    },
    {
      name: "Time",
      render: (item: TItem) =>
        new Date(item.time_event * 1000).toLocaleString(),
    },
    {
      name: "Game ID",
      render: (item: TItem) => item.appid,
    },
    {
      name: "Buttons Action",
      render: (item: TItem) => (
        <ItemActions
          name={item.market_hash_name}
          appid={item.appid}
          wiki={item.wiki_page}
          inspect={item.inspect_in_game_url}
        />
      ),
    },
    {
      name: "Current Price",
      render: (item: TItem) => (
        <ItemCurrentPrice name={item.market_hash_name} game={item.appid} />
      ),
    },
  ];

  return <Table columns={columns} data={items} nrCol />;
};

export default TableMarketHistory;
