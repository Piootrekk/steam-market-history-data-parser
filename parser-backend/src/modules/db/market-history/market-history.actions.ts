import { TItemDTO } from "../../server-sent-events/routes/market-history/items-coherence/items.types";
import { Db } from "mongodb";
import { TMarketHistoryModel } from "./market-history.model";
import {
  clearCollectionByName,
  getAllCollections,
  getDocumentsCount,
} from "../db-actions";

const insertBulkTransactions = async (
  steamid: string,
  transactions: TItemDTO[],
  db: Db
): Promise<void> => {
  const collection = db.collection<TMarketHistoryModel>(
    `${steamid}-market-history`
  );
  await collection.insertMany(transactions);
};

const clearAllHistor = async (steamid: string, db: Db): Promise<void> => {
  await clearCollectionByName(`${steamid}-market-history`, db);
};

const getMarketHistoryRecords = async (
  steamid: string,
  db: Db
): Promise<number> => {
  const count = await getDocumentsCount(`${steamid}-market-history`, db);
  return count;
};

const getMarketHistoryCollections = async (db: Db): Promise<string[]> => {
  const allCollectios = await getAllCollections(db);
  const marketCollections = allCollectios.filter((collection) =>
    collection.includes("market-history")
  );
  return marketCollections;
};

export {
  insertBulkTransactions,
  clearAllHistor,
  getMarketHistoryRecords,
  getMarketHistoryCollections,
};
