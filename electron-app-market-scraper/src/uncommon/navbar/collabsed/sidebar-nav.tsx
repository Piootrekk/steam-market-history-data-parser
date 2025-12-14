import NavLink from "src/common/components/primitives/navlink";
import type { Route } from "src/routes";
import SideBarSubCategoryCollabsed from "./sub-category";
import { Users2 } from "lucide-react";

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

type SideBarNavProps = {
  sidebarItems: Route[];
};

const SideBarNavCollabsed = ({ sidebarItems }: SideBarNavProps) => {
  return (
    <nav className="flex-1 p-2 space-y-1">
      {sidebarItems.map((item) => (
        <CurrentSideBar key={item.to} {...item} />
      ))}
      <SideBarSubCategoryCollabsed children={undefined} icon={Users2} />
    </nav>
  );
};

export default SideBarNavCollabsed;
