import type { TransformDto } from "./fetch/listing.dto";
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

type ListingsFetcherConfig = {
  cookies: string;
  logCallback: (
    message: string,
    status: "warning" | "success" | "info",
  ) => void;
} & Partial<typeof BASE_CONFIG>;

const BASE_CONFIG = {
  maxCount: 500,
  retrySleepMs: 4000,
  retryAttempts: 15,
  sleepMs429: 15000,
  sleepBetweenFetches: 4000,
} as const;

const createListingsFetcher = ({
  cookies,
  logCallback,
  maxCount = BASE_CONFIG.maxCount,
  retrySleepMs = BASE_CONFIG.retrySleepMs,
  retryAttempts = BASE_CONFIG.retryAttempts,
  sleepMs429 = BASE_CONFIG.sleepMs429,
  sleepBetweenFetches = BASE_CONFIG.sleepBetweenFetches,
}: ListingsFetcherConfig) => {
  const retryConfig = {
    retrySleepMs,
    retryAttempts,
    sleepMs429,
  };

  const firstListingsFetch = async () => {
    const fetchConfig = {
      start: 0,
      count: maxCount,
      cookies,
    } satisfies FetchParams;
    const firstResponse = await retryFetchAttemptsIfFailed(
      fetchConfig,
      retryConfig,
      logCallback,
    );
    const transformedFirstResponse =
      getTransformedCorrectResponse(firstResponse);
    logCallback("First inital fetch complated.", "success");
    return {
      totalCount: firstResponse.total_count,
      listings: transformedFirstResponse,
    };
  };

  const getBatches = (totalCount: number) => {
    const calculateFetches = calculateRestBatches(maxCount, totalCount);
    logCallback(`Remaning fetches: ${calculateFetches.length}`, "info");
    return calculateFetches;
  };

  const detectAnomalyMissmatchTotalCount = (
    totalCountOrigin: number,
    totalCountCurrent: number,
  ) => {
    if (totalCountOrigin !== totalCountCurrent)
      logCallback(
        `Anomaly detection, missing some listings totalCount from initial fetch: ${totalCountOrigin}, \
         current fetch: ${totalCountCurrent}.`,
        "warning",
      );
  };

  const otherListingsFetches = async (
    totalCount: number,
    batches: FetchIteration[],
    listingsCallback: (listings: TransformDto) => void | Promise<void>,
  ) => {
    for (const batch of batches) {
      await sleep(sleepBetweenFetches);
      const fetchesConfig = {
        start: batch.min,
        count: batch.count,
        cookies: cookies,
      } satisfies FetchParams;
      const anotherResponse = await retryFetchAttemptsIfFailed(
        fetchesConfig,
        retryConfig,
        logCallback,
      );
      const transformedAnotherResponse =
        getTransformedCorrectResponse(anotherResponse);
      detectAnomalyMissmatchTotalCount(totalCount, anotherResponse.total_count);
      await listingsCallback(transformedAnotherResponse);
      logCallback(
        `Fetch complated ${batch.min} - ${
          batch.count + batch.min
        }, ${batch.index + 1}/${batches.length}`,
        "success",
      );
    }
  };
  return {
    firstListingsFetch,
    getBatches,
    otherListingsFetches,
  };
};

export { createListingsFetcher, BASE_CONFIG };
