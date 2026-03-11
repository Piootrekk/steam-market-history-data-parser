import { NavButton } from "@renderer/common/components/primitives/navlink";
import type { NavRoutes } from "@renderer/routes";
import { Users2 } from "lucide-react";
import SideBarSubCategoryExpended from "./sub-category";

type SideBarNavExtendedProps = {
  routes: NavRoutes[];
  accounts: NavRoutes[];
};

const SideBarNavExtended = ({ routes, accounts }: SideBarNavExtendedProps) => {
  return (
    <nav className="flex-1 space-y-1 p-2">
      {routes.map((route) => (
        <CurrentSideBar key={route.path} {...route} />
      ))}
      {accounts.length > 0 && (
        <SideBarSubCategoryExpended icon={Users2} name={"Users"}>
          {accounts.map((account) => (
            <CurrentSideBar key={`${account.path}`} {...account} />
          ))}
        </SideBarSubCategoryExpended>
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
      className={"h-10 w-full justify-start gap-3"}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate">{label}</span>
    </NavButton>
  );
};

export default SideBarNavExtended;
