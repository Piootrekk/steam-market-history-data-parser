const BASE_CONFIG = {
  maxCount: 500,
  retrySleepMs: 4000,
  retryAttempts: 15,
  sleepMs429: 15000,
  sleepBetweenFetches: 4000,
} as const;

type BaseConfig = typeof BASE_CONFIG;

export { BASE_CONFIG };
export type { BaseConfig };
