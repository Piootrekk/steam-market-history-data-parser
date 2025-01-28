import { TItemDTO } from "@modules/ws/routes/market-history/items-coherence/items.types";
import { Db } from "mongodb";
import { TMarketHistoryModel } from "./market-history.model";
import {
  clearCollectionByName,
  getAllCollections,
  getDocumentsCount,
} from "../db-actions";

const insertBulkTransactions = async (
  id: string,
  transactions: TItemDTO[],
  db: Db
): Promise<void> => {
  const collection = db.collection<TMarketHistoryModel>(`MH-${id}`);
  await collection.insertMany(transactions);
};

const clearAllHistor = async (id: string, db: Db): Promise<void> => {
  await clearCollectionByName(`MH-${id}`, db);
};

const getMarketHistoryRecords = async (id: string, db: Db): Promise<number> => {
  const count = await getDocumentsCount(`MH-${id}`, db);
  return count;
};

const getMarketHistoryCollections = async (db: Db): Promise<string[]> => {
  const allCollectios = await getAllCollections(db);
  const marketCollections = allCollectios.filter((collection) =>
    collection.includes("MH")
  );
  return marketCollections;
};

export {
  insertBulkTransactions,
  clearAllHistor,
  getMarketHistoryRecords,
  getMarketHistoryCollections,
};
