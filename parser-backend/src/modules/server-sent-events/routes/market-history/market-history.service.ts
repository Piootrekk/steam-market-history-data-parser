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
import { TSSEClientMessageModel } from "./market-history.schema";

const saveAllHistoryToDb = async (
  steamid: string,
  clinet: TSSEClientMessageModel,
  db: Db,
  cookies: string
): Promise<void> => {
  const delay = 5000;
  const fetchChunkLimit = 500;
  const startFetch = 0;

  const { totalFetches, totalCount } = await getTotalFetchesAndCount(
    fetchChunkLimit,
    startFetch,
    cookies
  );
  for (let index = 0; index < totalFetches; index++) {
    const startingItem = index * fetchChunkLimit + startFetch;
    const response = await retryFetch<TMarketHistoryResponse>(
      () => fetchMarketHistory(startingItem, fetchChunkLimit, cookies),
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
      currentFetch: index + 1,
      allFetches: totalFetches,
    };

    sseClient.sendMessage(clinet, sseData);
    if (index === totalFetches - 1) return;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

const synchronizeHistoryToDb = async (
  steamid: string,
  clinet: TSSEClientMessageModel,
  db: Db,
  cookies: string
) => {
  const delay = 5000;
  const fetchChunkLimit = 500;
  const startFetch = 0;

  const totalCount = await getTotalCount(cookies);
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
      () => fetchMarketHistory(startingItem, fetchChunkLimit, cookies),
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
      currentFetch: index + 1,
      allFetches: change ? chunks + 1 : chunks,
    };
    sseClient.sendMessage(clinet, sseData);
    if (change !== 0)
      await new Promise((resolve) => setTimeout(resolve, delay));
  }
  if (change !== 0) {
    const responseChange = await retryFetch<TMarketHistoryResponse>(
      () => fetchMarketHistory(chunks * fetchChunkLimit, change, cookies),
      5,
      delay
    );
    const itemsChange = responesConverter(responseChange);
    await insertBulkTransactions(steamid, itemsChange, db);

    const sseData = {
      currentFetch: chunks + 1,
      allFetches: chunks + 1,
    };
    sseClient.sendMessage(clinet, sseData);
  }
};

export { saveAllHistoryToDb, synchronizeHistoryToDb };
