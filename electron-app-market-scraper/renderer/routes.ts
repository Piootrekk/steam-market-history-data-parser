const ROUTE_PATHS = {
  root: "/",
  dashboard: "",
  downloadAll: "download/all",
  downloadAmount: "download/amount",
  downlaodQrCode: "download/qr",
  about: "about",
  settings: "settings",

  accounts: "accounts",
  accountsAll: "all",
  account: ":steamId",

  accountTable: "",
  accountSync: "sync",
  accountConfig: "config",
} as const satisfies Record<string, string>;

const TABLE_PARAMS = {
  start: "start",
  limit: "limit",
  query: "query",
} as const satisfies Record<string, string>;

type NavRoutes = {
  path: string;
  label: string;
  Icon: React.ElementType;
};

export { ROUTE_PATHS, TABLE_PARAMS };
export type { NavRoutes };
