import { useState } from "react";
import { cn } from "../../common/utils/merge-styles";
import SidebarHeaderCollapsed from "./collabsed/sidebar-header";
import SidebarHeaderExtended from "./expended/sidebar-header";
import SideBarNavCollabsed from "./collabsed/sidebar-nav";
import SideBarNavExtended from "./expended/sidebar-nav";
import {
  ScrollArea,
  ScrollContainer,
} from "src/common/components/primitives/scroll-area";

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
      <ScrollContainer className="h-[calc(95vh-(var(--spacing)*4))]">
        <ScrollArea>
          {isCollabsed ? (
            <SidebarHeaderCollapsed
              onToggle={() => setIsCollabsed(!isCollabsed)}
            />
          ) : (
            <SidebarHeaderExtended
              title={appTitle}
              onToggle={() => setIsCollabsed(!isCollabsed)}
            />
          )}
          {isCollabsed ? <SideBarNavCollabsed /> : <SideBarNavExtended />}
        </ScrollArea>
      </ScrollContainer>
    </aside>
  );
};

export default Sidebar;
