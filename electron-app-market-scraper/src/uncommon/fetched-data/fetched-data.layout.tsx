import { Outlet } from "react-router-dom";
import BasicPageInfo from "src/common/components/composites/basic-page-info";
import TabNav, { type TabNavLinks } from "./tab-nav";
import { Database, RefreshCw, Table } from "lucide-react";

const subtabs = [
  {
    icon: RefreshCw,
    path: "/sync",
    label: "Synchronize",
  },
  {
    icon: Table,
    path: "/table",
    label: "Table",
  },
  {
    icon: Database,
    path: "/db-config",
    label: "Database Config",
  },
] satisfies TabNavLinks[];

const FetchedDataLayout = () => {
  return (
    <>
      <BasicPageInfo
        name={"Saved items from DB"}
        desc={`Current account data from market history fetch, 
        Can display items in table, synchronize new items, 
        display, manipulate snapshots nodes.`}
        Icon={Database}
      />
      <TabNav subtabs={subtabs} />
      <Outlet />
    </>
  );
};

export default FetchedDataLayout;
