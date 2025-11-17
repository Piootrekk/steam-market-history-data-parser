import NavLink from "src/common/components/navlink";
import type { Route } from "src/routes";
import SideBarSubCategoryExpended from "./sub-category";
import { Users2 } from "lucide-react";

type CurrentSideBarProps = Route;

const CurrentSideBar = ({ to, icon: Icon, label }: CurrentSideBarProps) => {
  return (
    <NavLink to={to} key={label} className={"w-full justify-start gap-3 h-10"}>
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate">{label}</span>
    </NavLink>
  );
};

type SideBarNavProps = {
  sidebarItems: Route[];
};

const SideBarNavExtended = ({ sidebarItems }: SideBarNavProps) => {
  return (
    <nav className="flex-1 p-2 space-y-1">
      {sidebarItems.map((item) => (
        <CurrentSideBar key={item.to} {...item} />
      ))}
      <SideBarSubCategoryExpended icon={Users2} name={"Users"}>
        <Users2 />
        <Users2 />
        <Users2 />
      </SideBarSubCategoryExpended>
    </nav>
  );
};

export default SideBarNavExtended;
