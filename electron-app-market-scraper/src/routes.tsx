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
  path: string;
  element: React.ReactElement;
  label: string;
  icon: React.ElementType;
};

const ROUTES = {
  dashboard: {
    path: "/",
    element: <DashboardPage />,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  downloadAll: {
    path: "/download/all",
    element: <DownloadAllPage />,
    label: "Download All",
    icon: Files,
  },
  downloadAmount: {
    path: "/download/amount",
    element: <></>,
    label: "Download Amount",
    icon: File,
  },
  about: {
    path: "/about",
    element: <></>,
    label: "About",
    icon: Info,
  },
  settings: {
    path: "/settings",
    element: <></>,
    label: "Settings",
    icon: Settings,
  },
} as const satisfies Record<string, Route>;

const ACCOUNT_ROUTES = {
  account1: {
    path: "/account1",
    element: <FetchedDataLayout />,
    label: "account1",
    icon: User,
  },
  account2: {
    path: "/account2",
    element: <FetchedDataLayout />,
    label: "account2",
    icon: User,
  },
  account3: {
    path: "/account3",
    element: <FetchedDataLayout />,
    label: "account3",
    icon: User,
  },
} satisfies Record<string, Route>;

export { ROUTES, ACCOUNT_ROUTES };
export type { Route };
