import { type Column } from "../../../common/components/composites/table/table";
import DataTable from "../../../common/components/composites/table/table";
import { useAccountTableInvoices } from "./accout-table.loader";

import { TableListingsPage } from "src/common/components/composites/table-listings-page";

const ListingsColumns: Column<Listings>[] = [
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
];

const AccountTablePage = () => {
  const { listings, listingsCount } = useAccountTableInvoices();

  return (
    <TableListingsPage listingsCount={listingsCount}>
      <DataTable columns={ListingsColumns} data={listings} />
    </TableListingsPage>
  );
};

export default AccountTablePage;
