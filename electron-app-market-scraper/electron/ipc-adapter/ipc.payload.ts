const channels = {
  setupCheck: "init:setup-check",
  getAllUsers: "db:users:all",
  startFetchingAll: "fetch:all:start",
  progressFetchingAll: "fetch:all:progress",
} as const satisfies Record<keyof Window["electronAPI"], string>;

export { channels };
