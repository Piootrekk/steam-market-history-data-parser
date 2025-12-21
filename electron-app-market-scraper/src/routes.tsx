const ROUTE_PATHS = {
  dashborad: "/",
  downloadAll: "/download/all",
  downloadAmount: "/download/amount",
  about: "/about",
  settings: "/settings",
  accounts: "/accounts",
  currentAccount: "/accounts/:accountId",
} as const satisfies Record<string, string>;

export { ROUTE_PATHS };
