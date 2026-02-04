import NavLink from "src/common/components/primitives/navlink";
import ToolTip from "src/common/components/primitives/tooltip";
import { Users2 } from "lucide-react";
import SideBarSubCategoryCollabsed from "./sub-category";
import type { NavRoutes } from "src/routes";

type SideBarNavCollabsedProps = {
  routes: NavRoutes[];
  accounts: NavRoutes[];
};

const SideBarNavCollabsed = ({
  routes,
  accounts,
}: SideBarNavCollabsedProps) => {
  return (
    <nav className="flex-1 p-2 space-y-1">
      {routes.map((route, index) => (
        <ToolTip
          key={`${route.label}-${index}`}
          side="right"
          message={route.label}
        >
          <CurrentSideBar {...route} />
        </ToolTip>
      ))}
      {accounts.length > 0 && (
        <SideBarSubCategoryCollabsed icon={Users2}>
          {accounts.map((account, index) => (
            <ToolTip
              key={`${account}-${index}`}
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
    <NavLink
      to={path}
      key={label}
      className={"w-full gap-3 h-10 justify-center px-0"}
    >
      <Icon className="h-5 w-5 shrink-0" />
    </NavLink>
  );
};

export default SideBarNavCollabsed;
