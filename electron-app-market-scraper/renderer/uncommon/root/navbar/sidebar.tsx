import { ScrollArea } from "@renderer/common/components/primitives/scroll-area";
import { useLocalStoredValue } from "@renderer/common/hooks/local-storage.hook";
import { cn } from "@renderer/common/utils/merge-styles";
import { type NavRoutes, ROUTE_PATHS } from "@renderer/routes";
import {
  File,
  Files,
  Info,
  LayoutDashboard,
  QrCode,
  User,
  Users,
} from "lucide-react";
import { generatePath } from "react-router-dom";
import SidebarHeaderCollapsed from "./collabsed/sidebar-header";
import SideBarNavCollabsed from "./collabsed/sidebar-nav";
import SidebarHeaderExtended from "./expended/sidebar-header";
import SideBarNavExtended from "./expended/sidebar-nav";
import { useAccountSubRoute } from "./nav-tab-selected.hook";
import { useUserNavInvoices } from "./sidebar.loader";

const appTitle = "Market History Manager";
const navItems = [
  { path: ROUTE_PATHS.dashboard, label: "Dashboard", Icon: LayoutDashboard },
  {
    path: ROUTE_PATHS.downloadAll,
    label: "Download All",
    Icon: Files,
  },
  {
    path: ROUTE_PATHS.downlaodQrCode,
    label: "Sync/Download via QR",
    Icon: QrCode,
  },
  {
    path: ROUTE_PATHS.downloadAmount,
    label: "Download amount",
    Icon: File,
  },
  {
    path: ROUTE_PATHS.about,
    label: "About",
    Icon: Info,
  },
] as const satisfies NavRoutes[];

const Sidebar = () => {
  const [storedValue, setValue] = useLocalStoredValue("ui-config");
  const accounts = useUserNavInvoices();
  const subRoute = useAccountSubRoute();

  const accountsNavWithoutAll = accounts.map((account) => ({
    label: account.steamid,
    path: generatePath(`/accounts/:accountId/:tab?`, {
      accountId: account.id.toString(),
      tab: subRoute || null,
    }),
    Icon: User,
  }));

  const accountsNav = [
    {
      path: `${ROUTE_PATHS.accounts}/${ROUTE_PATHS.accountsAll}`,
      label: "All accounts",
      Icon: Users,
    } satisfies NavRoutes,
    ...accountsNavWithoutAll,
  ];

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-sidebar-border border-r bg-sidebar pb-8 transition-all duration-100",
        storedValue.isCollapsed ? "w-16" : "w-64",
      )}
    >
      <ScrollArea direction="vertical">
        {storedValue.isCollapsed ? (
          <SidebarHeaderCollapsed
            onToggle={() =>
              setValue((prev) => ({
                ...prev,
                isCollapsed: !prev.isCollapsed,
              }))
            }
          />
        ) : (
          <SidebarHeaderExtended
            title={appTitle}
            onToggle={() =>
              setValue((prev) => ({
                ...prev,
                isCollapsed: !prev.isCollapsed,
              }))
            }
          />
        )}
        {storedValue.isCollapsed ? (
          <SideBarNavCollabsed routes={navItems} accounts={accountsNav} />
        ) : (
          <SideBarNavExtended routes={navItems} accounts={accountsNav} />
        )}
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
