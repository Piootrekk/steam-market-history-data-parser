import { BASE_CONFIG } from "./base.config";
import { type TransformDto } from "./fetch/listing.dto";
import type { FetchParams } from "./fetch/raw-fetch";
import {
  getTransformedCorrectResponse,
  retryFetchAttemptsIfFailed,
  sleep,
} from "./fetch/transform-fetch";
import {
  calculateRestBatches,
  type FetchIteration,
} from "./transforms/calculate-size";

const firstListingsFetch = async (
  cookies: string,
  logCallback: (message: string, status: "warning" | "success") => void
) => {
  const fetchConfig = {
    start: 0,
    count: BASE_CONFIG.maxCount,
    cookies,
  } satisfies FetchParams;
  const firstResponse = await retryFetchAttemptsIfFailed(
    fetchConfig,
    BASE_CONFIG,
    logCallback
  );
  const transformedFirstResponse = getTransformedCorrectResponse(firstResponse);
  logCallback("First inital fetch complated", "success");
  return {
    totalCount: firstResponse.total_count,
    listings: transformedFirstResponse,
  };
};

const getBatches = (
  totalCount: number,
  logCallback: (message: string, status: "info") => void
) => {
  const calculateFetches = calculateRestBatches(
    BASE_CONFIG.maxCount,
    totalCount
  );
  logCallback(`Remaning fetches: ${calculateFetches.length}`, "info");
  return calculateFetches.length;
};

const otherListingsFetches = async (
  cookies: string,
  fetchesCalc: FetchIteration[],
  logCallback: (message: string, status: "warning" | "success") => void,
  listingsCallback: (listings: TransformDto) => void | Promise<void>
) => {
  for (const fetchCalcEl of fetchesCalc) {
    await sleep(BASE_CONFIG.retrySleepMs);
    const fetchesConfig = {
      start: fetchCalcEl.min,
      count: fetchCalcEl.count,
      cookies: cookies,
    } satisfies FetchParams;
    const anotherResponse = await retryFetchAttemptsIfFailed(
      fetchesConfig,
      BASE_CONFIG,
      logCallback
    );
    const transformedAnotherResponse =
      getTransformedCorrectResponse(anotherResponse);

    listingsCallback(transformedAnotherResponse);
    logCallback(
      `Fetch complated ${fetchCalcEl.min} - ${
        fetchCalcEl.count + fetchCalcEl.min
      }, ${fetchCalcEl.index + 1}/${fetchesCalc.length}`,
      "success"
    );
  }
};

export { firstListingsFetch, getBatches, otherListingsFetches };
