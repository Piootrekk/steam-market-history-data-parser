import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../common/components/primitives/card";
import { type Column } from "../../../common/components/composites/table/table";
import DataTable from "../../../common/components/composites/table/table";
import { useAccountTableInvoices } from "./accout-table.loader";

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
    header: "Amount",
    render: (item) => new Date(item.timeEvent * 1000).toLocaleString("en-GB"),
  },
];

const AccountTable = () => {
  const listings = useAccountTableInvoices();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={ListingsColumns} data={listings} />
      </CardContent>
    </Card>
  );
};

export default AccountTable;
