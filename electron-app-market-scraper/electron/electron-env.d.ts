/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ROOT: string;
    VITE_PUBLIC: string;
    DB_PATH: string;
  }
}

interface Window {
  electronAPI: {
    setupCheck: (callback: (value: string) => void) => void;
  };
}
