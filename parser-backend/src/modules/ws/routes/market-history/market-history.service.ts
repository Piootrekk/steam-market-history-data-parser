import { Db } from "mongodb";
import {
  getTotalFetchesAndCount,
  getTotalCount,
  getChunksAndChange,
} from "./items-coherence/fetch-prepare";
import TMarketHistoryResponse from "./fetch/fetch.types";
import { fetchMarketHistory } from "./fetch/fetches";
import responesConverter from "./items-coherence/items-coherence";
import { retryFetch } from "./items-coherence/fetch-queue";
import {
  getMarketHistoryRecords,
  insertBulkTransactions,
  insertBulkTransactionsWithPrefix,
} from "@modules/db/market-history/market-history.actions";
import { WebSocket } from "ws";
import {
  TFirstMessageRecieve,
  TSendMessage,
  validateClientPayload,
} from "./market-history.schema";
import CustomError from "@/config/error-converter";

const recieveFirstMessage = (message: string): TFirstMessageRecieve => {
  const result: TFirstMessageRecieve = { steamid: "", cookies: "" };
  const parsedMessage = JSON.parse(message) as TFirstMessageRecieve;
  if (!validateClientPayload(parsedMessage))
    throw new CustomError({
      customError: {
        message: "INVALID CLIENT PAYLOAD WS",
        status: 400,
      },
    });
  const { steamid, cookies } = parsedMessage;
  result.cookies = cookies;
  result.steamid = steamid;
  return result;
};

const saveAllHistoryToDb = async (
  steamid: string,
  connect: WebSocket,
  db: Db,
  cookies: string,
  isConnectionClosed: () => boolean
): Promise<void> => {
  const delay = 5000;
  const fetchChunkLimit = 500;
  const startFetch = 0;

  const { totalFetches } = await getTotalFetchesAndCount(
    fetchChunkLimit,
    startFetch,
    cookies
  );
  for (let index = 0; index < totalFetches; index++) {
    if (isConnectionClosed())
      throw new CustomError({
        customError: { message: "Connection terminated by client" },
      });
    const startingItem = index * fetchChunkLimit + startFetch;
    const response = await retryFetch<TMarketHistoryResponse>(
      () => fetchMarketHistory(startingItem, fetchChunkLimit, cookies),
      5,
      delay
    );
    const items = responesConverter(response);
    await insertBulkTransactionsWithPrefix(steamid, items, db);
    console.log(
      `----- CORRECT FETCH AND APPEND TO Db ${
        index + 1
      }/${totalFetches}, starting items: ${startingItem}`
    );

    const sendMessage: TSendMessage = {
      currentFetch: index + 1,
      allFetches: totalFetches,
    };
    connect.send(JSON.stringify(sendMessage));
    if (index === totalFetches - 1) return;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

const synchronizeHistoryToDb = async (
  steamid: string,
  connect: WebSocket,
  db: Db,
  cookies: string,
  isConnectionClosed: () => boolean
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
    if (isConnectionClosed())
      throw new CustomError({
        customError: { message: "Connection terminated by client" },
      });
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
    const sendMessage: TSendMessage = {
      currentFetch: index + 1,
      allFetches: change ? chunks + 1 : chunks,
    };

    connect.send(JSON.stringify(sendMessage));
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

    const changeToSend: TSendMessage = {
      currentFetch: chunks + 1,
      allFetches: chunks + 1,
    };
    connect.send(JSON.stringify(changeToSend));
  }
};

export { saveAllHistoryToDb, synchronizeHistoryToDb, recieveFirstMessage };
