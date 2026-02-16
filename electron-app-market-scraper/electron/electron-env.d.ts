/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ROOT: string;
    VITE_PUBLIC: string;
    DB_PATH: string;
    MIGRATION_PATH: string;
    IMAGE_STORAGE_PATH: string;
  }
}

type ValidationReturn<T> =
  | ({ ok: true } & T)
  | {
      ok: false;
      error: string;
    };

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

type ListingsAll = Listings & { steamid: string };

type ListingsCount = {
  countListings: number;
};

/// <reference path="./types/index.ts" />

interface Window {
  electronAPI: {
    setupCheck: (callback: (value: string) => void) => void;
    getAllUsers: () => Promise<string[]>;
    getCountListingsFromSteamId: (
      steamId: string,
      query?: string,
    ) => Promise<ValidationReturn<ListingsCount>>;
    getCountAllListings: (
      query?: string,
    ) => Promise<ValidationReturn<ListingsCount>>;
    getListingsFromSteamId: (
      steamId: string,
      start: number,
      limit: number,
      query?: string,
    ) => Promise<Listings[]>;
    getListingsAll: (
      start: number,
      limit: number,
      query?: string,
    ) => Promise<ListingsAll[]>;
    startFetchingAll: (steamId: string, cookies: string) => Promise<void>;
    startFetchingSync: (steamId: string, cookies: string) => Promise<void>;
    progressFetching: (
      callback: (
        status: "success" | "error" | "warning" | "info",
        timestamp: number,
        message?: string,
      ) => void,
    ) => () => void;
  };
}
