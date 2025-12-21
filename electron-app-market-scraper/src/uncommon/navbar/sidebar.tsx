import { useState } from "react";
import { cn } from "../../common/utils/merge-styles";
import SidebarHeaderCollapsed from "./collabsed/sidebar-header";
import SidebarHeaderExtended from "./expended/sidebar-header";
import SideBarNavCollabsed from "./collabsed/sidebar-nav";
import SideBarNavExtended from "./expended/sidebar-nav";
import {
  ScrollArea,
  ScrollContainer,
} from "src/common/components/primitives/scroll-area";
import { ROUTE_PATHS, type NavRoutes } from "src/routes";
import { File, Files, Info, LayoutDashboard, User, Users } from "lucide-react";
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
  const [isCollabsed, setIsCollabsed] = useState(false);
  const accounts = useUserNavInvoices();

  const accountsNavWithoutAll = accounts.map((account) => {
    return {
      path: `${ROUTE_PATHS.accounts}/${account}`,
      label: account,
      Icon: User,
    } satisfies NavRoutes;
  });

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
        "h-full border-r border-sidebar-border bg-sidebar transition-all duration-100 flex flex-col",
        isCollabsed ? "w-16" : "w-64"
      )}
    >
      <ScrollContainer className="h-[calc(95vh-(var(--spacing)*4))]">
        <ScrollArea>
          {isCollabsed ? (
            <SidebarHeaderCollapsed
              onToggle={() => setIsCollabsed(!isCollabsed)}
            />
          ) : (
            <SidebarHeaderExtended
              title={appTitle}
              onToggle={() => setIsCollabsed(!isCollabsed)}
            />
          )}
          {isCollabsed ? (
            <SideBarNavCollabsed routes={navItems} accounts={accountsNav} />
          ) : (
            <SideBarNavExtended routes={navItems} accounts={accountsNav} />
          )}
        </ScrollArea>
      </ScrollContainer>
    </aside>
  );
};

export default Sidebar;
