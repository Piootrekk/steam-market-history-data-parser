import { NavButton } from "@renderer/common/components/primitives/navlink";
import ToolTip from "@renderer/common/components/primitives/tooltip";
import type { NavRoutes } from "@renderer/routes";
import { Users2 } from "lucide-react";
import SideBarSubCategoryCollabsed from "./sub-category";

type SideBarNavCollabsedProps = {
  routes: NavRoutes[];
  accounts: NavRoutes[];
};

const SideBarNavCollabsed = ({
  routes,
  accounts,
}: SideBarNavCollabsedProps) => {
  return (
    <nav className="flex-1 space-y-1 p-2">
      {routes.map((route) => (
        <ToolTip key={`${route.path}`} side="right" message={route.label}>
          <CurrentSideBar {...route} />
        </ToolTip>
      ))}
      {accounts.length > 0 && (
        <SideBarSubCategoryCollabsed icon={Users2}>
          {accounts.map((account) => (
            <ToolTip
              key={`${account.path}`}
              side="right"
              message={account.label}
            >
              <CurrentSideBar {...account} />
            </ToolTip>
          ))}
        </SideBarSubCategoryCollabsed>
      )}
    </nav>
  );
};

type CurrentSideBarProps = NavRoutes;

const CurrentSideBar = ({ path, Icon, label }: CurrentSideBarProps) => {
  return (
    <NavButton
      to={path}
      key={label}
      className={"h-10 w-full justify-center gap-3 px-0"}
    >
      <Icon className="h-5 w-5 shrink-0" />
    </NavButton>
  );
};

export default SideBarNavCollabsed;
