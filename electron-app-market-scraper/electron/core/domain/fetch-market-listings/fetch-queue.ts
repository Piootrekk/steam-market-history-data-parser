import { BASE_CONFIG } from "./base.config";
import type { TransformDto } from "./fetch/listing.dto";
import type { FetchParams } from "./fetch/raw-fetch";

const queueFetchBulkAll = (
  cookies: string,
  logCallback: (message: string, status: "warning" | "success") => void,
  returnIterationCallback: (listings: TransformDto) => void
) => {
  const fetchConfig = {
    start: 0,
    count: BASE_CONFIG.maxCount,
    cookies,
  } satisfies FetchParams;
};

export { queueFetchBulkAll };
