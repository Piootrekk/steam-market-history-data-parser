import { useState } from "react";
import { cn } from "../../common/utils/merge-styles";
import Button from "src/common/components/button";
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Settings,
  Sun,
  TrendingUp,
  Users,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Analytics" },
  { icon: TrendingUp, label: "Revenue" },
  { icon: Users, label: "Users" },
  { icon: FileText, label: "Reports" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

const Sidebar = () => {
  const [isCollabsed, setIsCollabsed] = useState(false);
  return (
    <div
      className={cn(
        "h-full border-r border-sidebar-border bg-sidebar transition-all duration-300",
        isCollabsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!isCollabsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-sidebar-foreground">
              Dashboard
            </span>
          </div>
        )}
        <Button
          onClick={() => setIsCollabsed(!isCollabsed)}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollabsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        {sidebarItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-10",
              isCollabsed && "justify-center px-0",
              item.active
                ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollabsed && <span className="truncate">{item.label}</span>}
          </Button>
        ))}
      </nav>
      <div
        className={cn(
          "p-4 border-t border-sidebar-border",
          isCollabsed && "flex justify-center p-2"
        )}
      >
        <div>
          <Sun />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
