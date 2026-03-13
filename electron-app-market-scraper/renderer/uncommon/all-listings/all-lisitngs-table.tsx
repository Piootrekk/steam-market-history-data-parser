import DataTable, {
  type Column,
} from "@renderer/common/components/composites/table/table";
import { TableListingsPage } from "@renderer/common/components/composites/table-listings-page";
import SmartImg from "@renderer/common/components/primitives/smart-img/smart-img";
import {
  type ListingsAll,
  useAllListingsInvoices,
} from "./all-listings.loader";

const ListingsAllColumns: Column<ListingsAll>[] = [
  {
    key: "eventAction",
    header: "Event",
    render: (item) => item.eventAction,
  },
  {
    key: "iconHashStorage",
    header: "Icon",
    render: (item) => (
      <SmartImg src={item.iconHashStorage} alt={item.marketHashName} />
    ),
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
    render: (item) => item.timeEvent.toLocaleString("en-GB"),
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
