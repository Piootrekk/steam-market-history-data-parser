import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../common/components/primitives/card";
import { type Column } from "../../../common/components/composites/table/table";
import DataTable from "../../../common/components/composites/table/table";
import { useAccountTableInvoices } from "./accout-table.loader";
import {
  Input,
  InputContainer,
  InputLabel,
} from "src/common/components/primitives/input";
import { Search } from "lucide-react";

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
      <CardHeader className="space-y-6">
        <CardTitle>
          <p>Listings</p>
        </CardTitle>
        <InputContainer>
          <InputLabel>Search Query</InputLabel>
          <Input
            type="text"
            leftIcon={<Search size={20} className="shrink-0" />}
            placeholder={"Search hash name..."}
          />
        </InputContainer>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <DataTable columns={ListingsColumns} data={listings} />
      </CardContent>
    </Card>
  );
};

export default AccountTable;
