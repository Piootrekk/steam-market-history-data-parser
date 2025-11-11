import { useState } from "react";
import { cn } from "../../common/utils/merge-styles";
import Button from "src/common/components/button";
import SidebarHeader from "./sidebar-header";
import SideBarNav from "./sidebar-nav";
import { ROUTES } from "../../routes";
import { Sun } from "lucide-react";

const appTitle = "Market History Manager";

const Sidebar = () => {
  const [isCollabsed, setIsCollabsed] = useState(false);
  const routesArray = Object.values(ROUTES);
  return (
    <aside
      className={cn(
        "h-full border-r border-sidebar-border bg-sidebar transition-all duration-100 flex flex-col",
        isCollabsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader
        isCollabsed={isCollabsed}
        title={appTitle}
        setIsCollabsed={setIsCollabsed}
      />
      <nav className="flex-1 p-2 space-y-1">
        <SideBarNav sidebarItems={routesArray} isCollabsed={isCollabsed} />
      </nav>
      <div
        className={cn(
          "p-4 border-t border-sidebar-border",
          isCollabsed && "flex justify-center p-2"
        )}
      >
        <div>
          <Button variant="ghost">
            <Sun />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
