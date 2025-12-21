import NavLinkProps from "src/common/components/primitives/navlink";
import SideBarSubCategoryExpended from "./sub-category";
import { Users2 } from "lucide-react";
import type { NavRoutes } from "src/routes";

type SideBarNavExtendedProps = {
  routes: NavRoutes[];
  accounts: NavRoutes[];
};

const SideBarNavExtended = ({ routes, accounts }: SideBarNavExtendedProps) => {
  return (
    <nav className="flex-1 p-2 space-y-1">
      {routes.map((route) => (
        <CurrentSideBar key={route.path} {...route} />
      ))}
      {accounts.length > 0 && (
        <SideBarSubCategoryExpended icon={Users2} name={"Users"}>
          {accounts.map((account, index) => (
            <CurrentSideBar key={`${account}-${index}`} {...account} />
          ))}
        </SideBarSubCategoryExpended>
      )}
    </nav>
  );
};

type CurrentSideBarProps = NavRoutes;

const CurrentSideBar = ({ path, Icon, label }: CurrentSideBarProps) => {
  return (
    <NavLinkProps
      to={path}
      key={label}
      className={"w-full justify-start gap-3 h-10"}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate">{label}</span>
    </NavLinkProps>
  );
};

export default SideBarNavExtended;
