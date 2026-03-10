import type { ValidationReturn } from "./handlers/common/common.types";
import type {
  ListingsAllDto,
  ListingsDto,
} from "./handlers/listings/listings.dto";
import type { ListingsCountDto } from "./handlers/listings-count/listings-count.dto";
import type { UserAllDto } from "./handlers/user-all/user-all.dto";

type ElectronAPI = {
  setupCheck: (callback: (value: string) => void) => void;
  getAllUsers: () => Promise<UserAllDto[]>;
  getCountListingsFromSteamId: (
    accountId: number,
    query?: string,
  ) => Promise<ValidationReturn<ListingsCountDto>>;
  getCountAllListings: (
    query?: string,
  ) => Promise<ValidationReturn<ListingsCountDto>>;
  getListingsFromSteamId: (
    accountId: number,
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
  startFetchingSync: (accountId: number, cookies: string) => Promise<void>;
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
