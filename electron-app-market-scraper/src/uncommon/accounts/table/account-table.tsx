import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../common/components/primitives/card";
import { type Column } from "../../../common/components/composites/table/table";
import DataTable from "../../../common/components/composites/table/table";
import { useAccountTableInvoices } from "./accout-table.loader";
import AccountTablePagination from "./account-pagination";
import AccountTableFilters from "./account-filters";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

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
  const [searchParam, setSearchParams] = useSearchParams();
  const listings = useAccountTableInvoices();

  const getSearchTerm = () => {
    const searchQuery = searchParam.get("query");
    return searchQuery;
  };

  const setSearchTerm = (searchTerm: string | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (searchTerm) next.set("query", searchTerm);
      else next.delete("query");

      next.delete("start");
      next.delete("limit");

      return next;
    });
  };

  const handleSearch = useCallback((searchTerm: string | null) => {
    setSearchTerm(searchTerm);
    console.log(searchTerm);
  }, []);

  return (
    <Card>
      <CardHeader className="space-y-6">
        <CardTitle>
          <p>Listings</p>
        </CardTitle>
        <AccountTableFilters
          searchParam={getSearchTerm()}
          onSearch={handleSearch}
        />
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <DataTable columns={ListingsColumns} data={listings.listings} />
        <AccountTablePagination
          totalCount={listings.listingsCount}
          urlSearchParams={searchParam}
        />
      </CardContent>
    </Card>
  );
};

export default AccountTable;
