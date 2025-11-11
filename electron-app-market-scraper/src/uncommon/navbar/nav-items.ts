import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Bell,
  Settings,
} from "lucide-react";

type SidebarItem = {
  to: string;
  icon: React.ElementType;
  label: string;
};

const sidebarItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/s1", icon: BarChart3, label: "Analytics" },
  { to: "/s2", icon: TrendingUp, label: "Revenue" },
  { to: "/a3a", icon: Users, label: "Users" },
  { to: "/a4a", icon: FileText, label: "Reports" },
  { to: "/a6a", icon: Bell, label: "Notifications" },
  { to: "/a77a", icon: Settings, label: "Settings" },
] satisfies SidebarItem[];

export { sidebarItems };
export type { SidebarItem };
