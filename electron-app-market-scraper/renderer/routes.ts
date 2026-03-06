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
  account: ":accountId",

  accountTable: "",
  accountSync: "sync",
  accountConfig: "config",
} as const satisfies Record<string, string>;

const ROUTE_ID = {
  root: "root",
} as const satisfies Partial<Record<keyof typeof ROUTE_PATHS, string>>;

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

export { ROUTE_PATHS, TABLE_PARAMS, ROUTE_ID };
export type { NavRoutes };
