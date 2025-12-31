/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ROOT: string;
    VITE_PUBLIC: string;
    DB_PATH: string;
    MIGRATION_PATH: string;
  }
}

interface Window {
  electronAPI: {
    setupCheck: (callback: (value: string) => void) => void;
    getAllUsers: () => Promise<string[]>;
    startFetchingAll: (
      steamId: string,
      cookies: string
    ) => Promise<{ jobId: string }>;
    progressFetchingAll: (
      callback: (
        current: number,
        total: number,
        status: string,
        message?: string
      ) => void
    ) => void;
  };
}
