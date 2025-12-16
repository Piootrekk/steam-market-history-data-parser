import NavLinkProps from "src/common/components/primitives/navlink";
import { ACCOUNT_ROUTES, ROUTES, type Route } from "src/routes";
import SideBarSubCategoryExpended from "./sub-category";
import { Users2 } from "lucide-react";

type CurrentSideBarProps = Route;

const CurrentSideBar = ({ to, icon: Icon, label }: CurrentSideBarProps) => {
  return (
    <NavLinkProps
      to={to}
      key={label}
      className={"w-full justify-start gap-3 h-10"}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate">{label}</span>
    </NavLinkProps>
  );
};

const SideBarNavExtended = () => {
  const routesArray = Object.values(ROUTES);
  const accountSubArray = Object.values(ACCOUNT_ROUTES);
  return (
    <nav className="flex-1 p-2 space-y-1">
      {routesArray.map((route) => (
        <CurrentSideBar key={route.to} {...route} />
      ))}
      <SideBarSubCategoryExpended icon={Users2} name={"Users"}>
        {accountSubArray.map((route) => (
          <CurrentSideBar key={route.to} {...route} />
        ))}
      </SideBarSubCategoryExpended>
    </nav>
  );
};

export default SideBarNavExtended;
