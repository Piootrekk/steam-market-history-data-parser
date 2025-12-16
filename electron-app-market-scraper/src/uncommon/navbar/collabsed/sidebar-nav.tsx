import NavLink from "src/common/components/primitives/navlink";
import { ACCOUNT_ROUTES, ROUTES, type Route } from "src/routes";
import SideBarSubCategoryCollabsed from "./sub-category";
import { Users2 } from "lucide-react";
import ToolTip from "src/common/components/primitives/tooltip";

type CurrentSideBarProps = Route;

const CurrentSideBar = ({ to, icon: Icon, label }: CurrentSideBarProps) => {
  return (
    <NavLink
      to={to}
      key={label}
      className={"w-full gap-3 h-10 justify-center px-0"}
    >
      <Icon className="h-5 w-5 shrink-0" />
    </NavLink>
  );
};

const SideBarNavCollabsed = () => {
  const routesArray = Object.values(ROUTES);
  const accountSubArray = Object.values(ACCOUNT_ROUTES);
  return (
    <nav className="flex-1 p-2 space-y-1">
      {routesArray.map((route, index) => (
        <ToolTip
          key={`${route.label}-${index}`}
          side="right"
          message={route.label}
        >
          <CurrentSideBar {...route} />
        </ToolTip>
      ))}
      <SideBarSubCategoryCollabsed icon={Users2}>
        {accountSubArray.map((route, index) => (
          <ToolTip
            key={`${route.label}-${index}`}
            side="right"
            message={route.label}
          >
            <CurrentSideBar {...route} />
          </ToolTip>
        ))}
      </SideBarSubCategoryCollabsed>
    </nav>
  );
};

export default SideBarNavCollabsed;
