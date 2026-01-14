/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ROOT: string;
    VITE_PUBLIC: string;
    DB_PATH: string;
    MIGRATION_PATH: string;
  }
}

type Listings = {
  appId: number;
  backgroundColor: string;
  classId: string;
  currency: string;
  eventAction: string;
  eventType: number;
  game: string;
  id: number;
  instanceId: string;
  listingId: string | null;
  marketHashName: string;
  nameColor: string;
  originalAmount: string;
  price: number;
  purchaseId: string | null;
  snapshotId: number;
  steamidActor: string | null;
  timeEvent: number;
  urlIcon: string;
};

interface Window {
  electronAPI: {
    setupCheck: (callback: (value: string) => void) => void;
    getAllUsers: () => Promise<string[]>;
    getListingsFromSteamId: (
      steamId: string,
      start: number,
      limit: number
    ) => Promise<Listings[]>;
    startFetchingAll: (
      steamId: string,
      cookies: string
    ) => Promise<{ jobId: string }>;
    progressFetchingAll: (
      callback: (
        status: "success" | "error" | "warning" | "info",
        timestamp: number,
        message?: string
      ) => void
    ) => () => void;
  };
}
