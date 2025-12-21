const ROUTE_PATHS = {
  root: "/",
  dashboard: "",
  downloadAll: "download/all",
  downloadAmount: "download/amount",
  about: "about",
  settings: "settings",

  accounts: "accounts",
  accountsAll: "all",
  account: ":accountId",

  accountTable: "",
  accountSync: "sync",
  accountConfigDb: "config",
} as const satisfies Record<string, string>;

type NavRoutes = {
  path: string;
  label: string;
  Icon: React.ElementType;
};

export { ROUTE_PATHS };
export type { NavRoutes };
