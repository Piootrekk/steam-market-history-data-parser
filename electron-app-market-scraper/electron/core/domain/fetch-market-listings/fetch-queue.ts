import { standarizeCustomError } from "../global-utils/custom-error";

const sleep = async (timeMs: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
};

const retryFetchIfFailed = async <T = unknown>(
  callbackFn: () => Promise<T>,
  retrySleepMs: number,
  retryAttempts: number,
  retrySleepMs429?: number
): Promise<T> => {
  let lastError: unknown;
  for (let attempt = 0; attempt < retryAttempts; attempt++) {
    try {
      const result = await callbackFn();
      return result;
    } catch (err) {
      const standarizedError = standarizeCustomError(err);
      if (standarizedError.status == 429)
        await sleep(retrySleepMs429 || retryAttempts);
      if (attempt < retryAttempts - 1) await sleep(retrySleepMs);
      lastError = err;
    }
  }
  throw lastError;
};

export { retryFetchIfFailed };
