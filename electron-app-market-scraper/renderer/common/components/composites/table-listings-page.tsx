import { useCallback, type PropsWithChildren } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { TABLE_PARAMS } from "@renderer/routes";
import { Card, CardContent, CardHeader, CardTitle } from "../primitives/card";
import TablePagination from "./table/pagination";
import AccountTableFilters from "@renderer/common/components/composites/table/account-filters";

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
    const searchQuery = searchParam.get(TABLE_PARAMS.query);
    return searchQuery;
  };

  const setSearchTerm = (searchTerm: string | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (searchTerm) next.set(TABLE_PARAMS.query, searchTerm);
      else next.delete(TABLE_PARAMS.query);

      next.delete(TABLE_PARAMS.start);
      next.delete(TABLE_PARAMS.limit);

      return next;
    });
  };

  const handleSearch = useCallback((searchTerm: string | null) => {
    setSearchTerm(searchTerm);
  }, []);

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
