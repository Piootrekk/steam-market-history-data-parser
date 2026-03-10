import AccountTableFilters from "@renderer/common/components/composites/table/account-filters";
import { TABLE_PARAMS } from "@renderer/routes";
import { type PropsWithChildren, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../primitives/card";
import TablePagination from "./table/pagination";

type TableListingsPageProps = PropsWithChildren & {
  listingsCount: number;
};

const TableListingsPage = ({
  children,
  listingsCount,
}: TableListingsPageProps) => {
  const [searchParam, setSearchParams] = useSearchParams();
  const { steamId } = useParams();

  const getSearchTerm = () => {
    return searchParam.get(TABLE_PARAMS.query);
  };

  const handleSearch = useCallback(
    (searchTerm: string | null) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (searchTerm) next.set(TABLE_PARAMS.query, searchTerm);
        else next.delete(TABLE_PARAMS.query);

        next.delete(TABLE_PARAMS.start);
        next.delete(TABLE_PARAMS.limit);

        return next;
      });
    },
    [setSearchParams],
  );

  return (
    <Card>
      <CardHeader className="space-y-6">
        <CardTitle>
          <p>Listings</p>
        </CardTitle>
        <AccountTableFilters
          key={steamId}
          searchParam={getSearchTerm()}
          onSearch={handleSearch}
        />
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {children}
        <TablePagination
          totalCount={listingsCount}
          urlSearchParams={searchParam}
        />
      </CardContent>
    </Card>
  );
};

export { TableListingsPage };
