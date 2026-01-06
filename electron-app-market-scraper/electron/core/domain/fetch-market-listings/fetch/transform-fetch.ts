import { getFetchError } from "../../global-utils/custom-error";
import { type FetchParams, fetchMarketHistory } from "./raw-fetch";
import type { MarketFetchResponse } from "./raw-fetch-response.types";
import { mergeResponse } from "../transforms/summary-all-transforms";
import { type TransformDto, transformDto } from "./listing.dto";

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

const getTransformedCorrectResponse = async (
  resp: MarketFetchResponse,
  actionCorrectLogger: (reponseDto: TransformDto) => Promise<void> | void
) => {
  const transformedResponse = mergeResponse(resp);
  const responseDto = transformDto(transformedResponse);
  await actionCorrectLogger(responseDto);
  return responseDto;
};

export { retryFetchAttemptsIfFailed, getTransformedCorrectResponse, sleep };
export type { FetchRetryParams };
