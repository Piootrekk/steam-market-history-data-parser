import { getFetchError } from "../fetch-error/custom-error";
import { type FetchParams, fetchMarketHistory } from "./raw-fetch";
import type { MarketFetchResponse } from "./raw-fetch-response.types";
import { mergeResponse } from "../transforms/summary-all-transforms";
import { transformDto } from "./listing.dto";

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
  actionFailedLogger: (message: string, status: "warning" | "success") => void
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
          `fetching chunk error 429: ${standarizedError.message} - ${
            attempt + 1
          }/ ${retryAttempts}`,
          "warning"
        );
        await sleep(sleepMs429 || retryAttempts);
      } else if (attempt < retryAttempts - 1) {
        actionFailedLogger(
          `fetching chunk error: ${standarizedError.message} - ${
            attempt + 1
          }/ ${retryAttempts}`,
          "warning"
        );
        await sleep(retrySleepMs);
      }
      lastError = err;
    }
  }
  throw lastError;
};

const getTransformedCorrectResponse = (resp: MarketFetchResponse) => {
  const transformedResponse = mergeResponse(resp);
  const responseDto = transformDto(transformedResponse);
  return responseDto;
};

export { retryFetchAttemptsIfFailed, getTransformedCorrectResponse, sleep };
export type { FetchRetryParams };
