import "./tableInventoryHistory.css";

import { TDocuments } from "@/api/marketHistory";
import Table from "@/common/components/Table/Table";
import type { TColumn } from "@/common/components/Table/Table";
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
      name: "Actions",
      render: (_item: TItem) => "SOON",
    },
    {
      name: "Current Price",
      render: (_item: TItem) => "SOON",
    },
  ];

  return <Table columns={columns} data={items} />;
};

export default TableMarketHistory;
