import { TableListingsPage } from "@renderer/common/components/composites/table-listings-page";
import DataTable, {
  type Column,
} from "@renderer/common/components/composites/table/table";
import {
  useAllListingsInvoices,
  type ListingsAll,
} from "./all-listings.loader";

const ListingsAllColumns: Column<ListingsAll>[] = [
  {
    key: "eventAction",
    header: "Event",
    render: (item) => item.eventAction,
  },
  {
    key: "marketHashName",
    header: "Market Hash Name",
    render: (item) => item.marketHashName,
  },
  {
    key: "game",
    header: "Game",
    render: (item) => item.game,
  },
  {
    key: "price",
    header: "Price",
    render: (item) => `${item.price} ${item.currency}`,
  },
  {
    key: "originalAmount",
    header: "Amount",
    render: (item) => `${item.originalAmount}`,
  },
  {
    key: "timeEvent",
    header: "Time",
    render: (item) => new Date(item.timeEvent * 1000).toLocaleString("en-GB"),
  },
  {
    key: "steamid",
    header: "Steam Id",
    render: (item) => item.steamid,
  },
];

const AccoutAllTable = () => {
  const { listings, listingsCount } = useAllListingsInvoices();
  return (
    <TableListingsPage listingsCount={listingsCount}>
      <DataTable columns={ListingsAllColumns} data={listings} />
    </TableListingsPage>
  );
};

export default AccoutAllTable;
