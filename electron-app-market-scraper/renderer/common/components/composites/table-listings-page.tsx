import type { PropsWithChildren } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../primitives/card";
import TablePagination from "./table/pagination";
import { TableFiltersTab } from "./table/table-filters";

type TableListingsPageProps = PropsWithChildren & {
  listingsCount: number;
};

const TableListingsPage = ({
  children,
  listingsCount,
}: TableListingsPageProps) => {
  const [searchParam, _] = useSearchParams();

  return (
    <Card>
      <CardHeader className="space-y-6">
        <CardTitle>
          <p>Listings</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <TableFiltersTab />
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
