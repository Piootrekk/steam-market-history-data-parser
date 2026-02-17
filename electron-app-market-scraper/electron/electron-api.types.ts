import type { ValidationReturn } from "./handlers/common/common.types";
import type { ListingsCountDto } from "./handlers/listings-count/listings-count.dto";
import type {
  ListingsAllDto,
  ListingsDto,
} from "./handlers/listings/listings.dto";

type ElectronAPI = {
  setupCheck: (callback: (value: string) => void) => void;
  getAllUsers: () => Promise<string[]>;
  getCountListingsFromSteamId: (
    steamId: string,
    query?: string,
  ) => Promise<ValidationReturn<ListingsCountDto>>;
  getCountAllListings: (
    query?: string,
  ) => Promise<ValidationReturn<ListingsCountDto>>;
  getListingsFromSteamId: (
    steamId: string,
    start: number,
    limit: number,
    query?: string,
  ) => Promise<ListingsDto[]>;
  getListingsAll: (
    start: number,
    limit: number,
    query?: string,
  ) => Promise<ListingsAllDto[]>;
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

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
