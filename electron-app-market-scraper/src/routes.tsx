import { Download, Info, LayoutDashboard, Settings, User } from "lucide-react";
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
  download: {
    to: "/download",
    component: <></>,
    label: "Download",
    icon: Download,
  },
  accounts: {
    to: "/account",
    component: <></>,
    label: "Accounts",
    icon: User,
  },
  about: {
    to: "/about",
    component: <></>,
    label: "About",
    icon: Info,
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
