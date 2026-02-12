const channels = {
  setupCheck: "init:setup-check",
  getAllUsers: "db:users:all",
  startFetchingAll: "fetch:all:start",
  startFetchingSync: "fetch:sync:start",
  progressFetching: "fetch:progress",
  getListingsFromSteamId: "db:user:listings",
  getCountListingsFromSteamId: "db:user:listings:count",
  getCountAllListings: "db:all:listings:count",
  getListingsAll: "db:all:listings",
} as const satisfies Record<keyof Window["electronAPI"], string>;

export { channels };
