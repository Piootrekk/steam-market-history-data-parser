const BASE_CONFIG = {
  maxCount: 500,
  retrySleepMs: 3500,
  retryAttempts: 15,
  sleepMs429: 15000,
  sleepBetweenFetches: 3500,
} as const;

type BaseConfig = typeof BASE_CONFIG;

export { BASE_CONFIG };
export type { BaseConfig };
