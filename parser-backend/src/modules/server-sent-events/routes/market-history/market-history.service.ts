import { TSSEClient } from "../../sse-client.types";
import { Db } from "mongodb";
import { getTotalFetches } from "./items-coherence/items-prepare";
import TMarketHistoryResponse from "./fetch/fetch.types";
import { fetchMarketHistory } from "./fetch/fetches";
import responesConverter from "./items-coherence/items-coherence";
import { retryFetch } from "./items-coherence/fetch-queue";
import {
  insertBulkTransactions,
  insertTotalCount,
} from "../../../db/market-history/market-history.actions";
import sseClient from "../../sse-client";
const saveAllHistoryToDb = async (
  steamid: string,
  clinet: TSSEClient,
  db: Db
): Promise<void> => {
  const delay = 5000;
  const fetchSize = 500;
  const startFetch = 0;

  const { totalFetches, totalCount } = await getTotalFetches(
    fetchSize,
    startFetch
  );
  for (let index = 0; index < totalFetches; index++) {
    const startingItem = index * fetchSize + startFetch;
    const response = await retryFetch<TMarketHistoryResponse>(
      () => fetchMarketHistory(startingItem, fetchSize),
      5,
      delay
    );
    const items = responesConverter(response);
    await insertBulkTransactions(steamid, items, db);
    console.log(
      `----- CORRECT FETCH AND APPEND TO FILE ${
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
  await insertTotalCount(totalCount, db);
};

export { saveAllHistoryToDb };
