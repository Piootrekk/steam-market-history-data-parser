import { BASE_CONFIG } from "./base.config";
import type { FetchParams } from "./fetch/raw-fetch";

const queueFetchBulkAll = (
  cookies: string,
  eventCallback: (message: string) => void
) => {
  const fetchConfig = {
    start: 0,
    count: BASE_CONFIG.maxCount,
    cookies,
  } satisfies FetchParams;
};

const queueFetchBulkSync = (
  cookies: string,
  eventCallback: (message: string) => void
) => {};

const queueFetchBulkCustom = (
  cookies: string,
  eventCallback: (message: string) => void
) => {};

export { queueFetchBulkAll, queueFetchBulkCustom, queueFetchBulkSync };
