import { getFetchError } from "../global-utils/custom-error";
import { fetchMarketHistory, type FetchParams } from "./fetch";

const sleep = async (timeMs: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
};

type FetchRetryParams = {
  retrySleepMs: number;
  retryAttempts: number;
  sleepMs429?: number;
};

const retryFetchAttemptsIfFailed = async (
  fetchConfig: FetchParams,
  retryConfig: FetchRetryParams,
  actionFailedLogger: (status: string, message: string) => void
) => {
  const { retryAttempts, retrySleepMs, sleepMs429 } = retryConfig;
  let lastError: unknown;
  for (let attempt = 0; attempt < retryAttempts; attempt++) {
    try {
      const result = await fetchMarketHistory(fetchConfig);
      return result;
    } catch (err) {
      const standarizedError = getFetchError(err);
      if (standarizedError.errorType === "ToManyRequestsError") {
        actionFailedLogger(
          "Error",
          `fetching chunk error 429: ${standarizedError.message} - ${
            attempt + 1
          }/ ${retryAttempts}`
        );
        await sleep(sleepMs429 || retryAttempts);
      } else if (attempt < retryAttempts - 1) {
        actionFailedLogger(
          "Error",
          `fetching chunk error: ${standarizedError.message} - ${
            attempt + 1
          }/ ${retryAttempts}`
        );
        await sleep(retrySleepMs);
      }
      lastError = err;
    }
  }
  throw lastError;
};

const calculateBatch = (min: number, count: number, totalCount: number) => {};

export { retryFetchAttemptsIfFailed, calculateBatch };
export type { FetchRetryParams };
