import { Outlet } from "react-router-dom";
import BasicPageInfo from "@renderer/common/components/composites/basic-page-info";
import TabNav from "./tab-nav";
import { Database, RefreshCw, Table } from "lucide-react";
import { ROUTE_PATHS, type NavRoutes } from "@renderer/routes";
const subtabs = [
  {
    path: ROUTE_PATHS.accountTable,
    label: "Table",
    Icon: Table,
  },
  {
    path: ROUTE_PATHS.accountSync,
    label: "Synchronize",
    Icon: RefreshCw,
  },

  {
    path: ROUTE_PATHS.accountConfig,
    label: "Database Config",
    Icon: Database,
  },
] satisfies NavRoutes[];

const AccountListingsLayout = () => {
  return (
    <>
      <BasicPageInfo
        name={"Saved items from DB"}
        desc={`Fetch the whole steam market history. 
        Can display items in table, synchronize new items, 
        display, manipulate snapshots nodes.`}
        Icon={Database}
      />

      <TabNav subtabs={subtabs} />

      <Outlet />
    </>
  );
};

export default AccountListingsLayout;
