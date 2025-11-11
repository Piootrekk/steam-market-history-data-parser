import {
  BarChart3,
  History,
  LayoutDashboard,
  Settings,
  TrendingUp,
} from "lucide-react";
import Dashboard from "./uncommon/dashboard/dashboard";

type Route = {
  to: string;
  component: React.ReactElement;
  label: string;
  icon: React.ElementType;
};

const ROUTES = {
  dashboard: {
    to: "/",
    component: <Dashboard />,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  analytics: {
    to: "/analytics",
    component: <></>,
    label: "Analytics",
    icon: BarChart3,
  },
  history: {
    to: "/history",
    component: <></>,
    label: "History",
    icon: History,
  },
  revenue: {
    to: "/revenue",
    component: <></>,
    label: "Revenue",
    icon: TrendingUp,
  },
  settings: {
    to: "/settings",
    component: <></>,
    label: "Settings",
    icon: Settings,
  },
} as const satisfies Record<string, Route>;

export { ROUTES };
export type { Route };
