import { getFetchError } from "../global-utils/custom-error";
import { fetchMarketHistory } from "./fetch";

const sleep = async (timeMs: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
};

const retryFetchMarketHistoryIfFailed = async (
  fetchArgs: Parameters<typeof fetchMarketHistory>,
  actionLogger: (message: string) => void,
  retrySleepMs: number,
  retryAttempts: number,
  sleepMs429?: number
) => {
  let lastError: unknown;
  for (let attempt = 0; attempt < retryAttempts; attempt++) {
    try {
      const result = await fetchMarketHistory(...fetchArgs);
      return result;
    } catch (err) {
      const standarizedError = getFetchError(err);
      if (standarizedError.errorType === "ToManyRequestsError")
        await sleep(sleepMs429 || retryAttempts);
      else if (attempt < retryAttempts - 1) await sleep(retrySleepMs);
      lastError = err;
    }
  }
  throw lastError;
};

export { retryFetchMarketHistoryIfFailed };
