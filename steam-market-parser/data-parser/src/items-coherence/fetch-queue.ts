import { error } from "console";
import { convertToCustomError } from "../error-converter";
import TMarketHistoryResponse from "../fetch/fetch.types";
import { fetchMarketHistory } from "../fetch/fetches";
import responesConverter from "./items-coherence";
import { getTotalFetches } from "./items-prepare";
import { TItemDTO } from "./items.types";

const retryFetch = async <T>(
  fetchFn: () => Promise<T>,
  retries: number,
  delay: number
): Promise<T> => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchFn();
      return res;
    } catch (err) {
      const error = convertToCustomError(err);
      console.warn(
        `Retry attempt ${attempt + 1}/${retries}: ${error.message} - ${
          error.getStatus
        }`
      );
      if (error.getStatus === 429 && attempt < retries) {
        console.log("Too many requests... increase delay.");
        await new Promise((resolve) => setTimeout(resolve, delay * 5));
      }
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw new Error("Failed to fetch data after maximum retries");
};

const fetchQueue = async (
  delay = 5000,
  fetchSize = 500,
  startFetch = 0
): Promise<TItemDTO[]> => {
  const totalFetches = await getTotalFetches(fetchSize, startFetch);
  let allHistory: TItemDTO[] = [];
  for (let index = 0; index < totalFetches; index++) {
    const startingItem = index * fetchSize + startFetch;
    const response = await retryFetch<TMarketHistoryResponse>(
      () => fetchMarketHistory(startingItem, fetchSize),
      5,
      delay
    );
    const items = responesConverter(response);
    allHistory = allHistory.concat(items);
    console.log(
      `----- CORRECT FETCH AND APPEND TO FILE ${
        index + 1
      }/${totalFetches}, starting items: ${startingItem}`
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return allHistory;
};

export default fetchQueue;
