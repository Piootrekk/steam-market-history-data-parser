import { useState } from "react";
import { cn } from "../../common/utils/merge-styles";
import SidebarHeaderCollapsed from "./collabsed/sidebar-header";
import SidebarHeaderExtended from "./expended/sidebar-header";
import SideBarNavCollabsed from "./collabsed/sidebar-nav";
import SideBarNavExtended from "./expended/sidebar-nav";

const appTitle = "Market History Manager";

const Sidebar = () => {
  const [isCollabsed, setIsCollabsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-full border-r border-sidebar-border bg-sidebar transition-all duration-100 flex flex-col",
        isCollabsed ? "w-16" : "w-64"
      )}
    >
      {isCollabsed ? (
        <SidebarHeaderCollapsed onToggle={() => setIsCollabsed(!isCollabsed)} />
      ) : (
        <SidebarHeaderExtended
          title={appTitle}
          onToggle={() => setIsCollabsed(!isCollabsed)}
        />
      )}
      {isCollabsed ? <SideBarNavCollabsed /> : <SideBarNavExtended />}
    </aside>
  );
};

export default Sidebar;
