import { TItemDTO } from "../../server-sent-events/routes/market-history/items-coherence/items.types";
import { Db } from "mongodb";
import { TMarketHistoryModel } from "./market-history.model";
import { clearCollectionByName, getDocumentsCount } from "../db-actions";

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

export { insertBulkTransactions, clearAllHistor, getMarketHistoryRecords };
