import { TItemDTO } from "../../server-sent-events/routes/market-history/items-coherence/items.types";
import { Db } from "mongodb";
import {
  TMarketHistoryModel,
  TMarketHistoryStatsModel,
} from "./market-history.model";

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

const insertTotalCount = async (totalCount: number, db: Db): Promise<void> => {
  const collection = db.collection<TMarketHistoryStatsModel>("history-stats");
  await collection.insertOne({
    total_count: totalCount,
  });
};

export { insertBulkTransactions, insertTotalCount };
