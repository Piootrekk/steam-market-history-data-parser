import {
  File,
  Files,
  Info,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import DashboardPage from "./uncommon/dashboard/dashboard.page";
import DownloadAllPage from "./uncommon/fetch-all/download.page";
import FetchedDataLayout from "./uncommon/fetched-data/fetched-data.layout";

type Route = {
  to: string;
  component: React.ReactElement;
  label: string;
  icon: React.ElementType;
};

const ROUTES = {
  dashboard: {
    to: "/",
    component: <DashboardPage />,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  downloadAll: {
    to: "/download/all",
    component: <DownloadAllPage />,
    label: "Download All",
    icon: Files,
  },
  downloadAmount: {
    to: "/download/amount",
    component: <DownloadAllPage />,
    label: "Download Amount",
    icon: File,
  },
  accounts: {
    to: "/accounts",
    component: <FetchedDataLayout />,
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

const ACCOUNT_ROUTES = [
  {
    to: "/account1",
    component: <FetchedDataLayout />,
    label: "account1",
    icon: User,
  },
  {
    to: "/account2",
    component: <FetchedDataLayout />,
    label: "account2",
    icon: User,
  },
  {
    to: "/account3",
    component: <FetchedDataLayout />,
    label: "account3",
    icon: User,
  },
] satisfies Route[];

export { ROUTES, ACCOUNT_ROUTES };
export type { Route };
