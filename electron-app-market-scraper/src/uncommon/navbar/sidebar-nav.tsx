import NavLink from "src/common/components/navlink";
import { cn } from "src/common/utils/merge-styles";
import type { SidebarItem } from "./nav-items";

type CurrentSideBarProps = SidebarItem & {
  isCollabsed: boolean;
};

const CurrentSideBar = ({
  to,
  icon: Icon,
  label,
  isCollabsed,
}: CurrentSideBarProps) => {
  return (
    <NavLink
      to={to}
      key={label}
      className={cn(
        "w-full justify-start gap-3 h-10",
        isCollabsed && "justify-center px-0"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!isCollabsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
};

type SideBarNavProps = {
  sidebarItems: SidebarItem[];
  isCollabsed: boolean;
};

const SideBarNav = ({ sidebarItems, isCollabsed }: SideBarNavProps) => {
  return sidebarItems.map((item) => (
    <CurrentSideBar key={item.to} {...item} isCollabsed={isCollabsed} />
  ));
};

export default SideBarNav;

//  item.active
//                 ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
//                 : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//             )}
