import { TSSEClient } from "../../sse-client.types";
import { Db } from "mongodb";
import {
  getTotalFetchesAndCount,
  getTotalCount,
  getChunksAndChange,
} from "./items-coherence/items-prepare";
import TMarketHistoryResponse from "./fetch/fetch.types";
import { fetchMarketHistory } from "./fetch/fetches";
import responesConverter from "./items-coherence/items-coherence";
import { retryFetch } from "./items-coherence/fetch-queue";
import {
  getMarketHistoryRecords,
  insertBulkTransactions,
} from "../../../db/market-history/market-history.actions";
import sseClient from "../../sse-client";

const saveAllHistoryToDb = async (
  steamid: string,
  clinet: TSSEClient,
  db: Db
): Promise<void> => {
  const delay = 5000;
  const fetchChunkLimit = 500;
  const startFetch = 0;

  const { totalFetches, totalCount } = await getTotalFetchesAndCount(
    fetchChunkLimit,
    startFetch
  );
  for (let index = 0; index < totalFetches; index++) {
    const startingItem = index * fetchChunkLimit + startFetch;
    const response = await retryFetch<TMarketHistoryResponse>(
      () => fetchMarketHistory(startingItem, fetchChunkLimit),
      5,
      delay
    );
    const items = responesConverter(response);
    await insertBulkTransactions(steamid, items, db);
    console.log(
      `----- CORRECT FETCH AND APPEND TO Db ${
        index + 1
      }/${totalFetches}, starting items: ${startingItem}`
    );

    const sseData = {
      fetch: index + 1,
      totalFetches,
      totalCount,
    };

    sseClient.sendMessage(clinet, JSON.stringify(sseData));
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

const synchronizeHistoryToDb = async (
  steamid: string,
  clinet: TSSEClient,
  db: Db
) => {
  const delay = 5000;
  const fetchChunkLimit = 500;
  const startFetch = 0;

  const totalCount = await getTotalCount();
  const lastTotalCount = await getMarketHistoryRecords(steamid, db);
  if (totalCount === lastTotalCount) return;
  const newItems = totalCount - lastTotalCount;
  const { chunks, change } = await getChunksAndChange(
    fetchChunkLimit,
    newItems
  );
  for (let index = 0; index < chunks; index++) {
    const startingItem = index * fetchChunkLimit + startFetch;
    const response = await retryFetch<TMarketHistoryResponse>(
      () => fetchMarketHistory(startingItem, fetchChunkLimit),
      5,
      delay
    );
    const items = responesConverter(response);
    await insertBulkTransactions(steamid, items, db);
    console.log(
      `----- CORRECT FETCH AND APPEND TO Db ${
        index + 1
      }/${chunks}, starting items: ${startingItem}`
    );
    const sseData = {
      fetch: index + 1,
      chunks,
      totalCount,
    };
    sseClient.sendMessage(clinet, JSON.stringify(sseData));
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  const responseChange = await retryFetch<TMarketHistoryResponse>(
    () => fetchMarketHistory(chunks * fetchChunkLimit, change),
    5,
    delay
  );
  const itemsChange = responesConverter(responseChange);
  await insertBulkTransactions(steamid, itemsChange, db);

  const sseData = {
    change,
    totalCount,
  };
  sseClient.sendMessage(clinet, JSON.stringify(sseData));
  await new Promise((resolve) => setTimeout(resolve, delay));
};

export { saveAllHistoryToDb, synchronizeHistoryToDb };
