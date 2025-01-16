import { ObjectId } from "@fastify/mongodb";
import { TItemDTO } from "../../server-sent-events/routes/market-history/items-coherence/items.types";

type TMarketHistoryModel = {
  _id?: ObjectId;
} & TItemDTO;

type TMarketHistoryStatsModel = {
  _id?: ObjectId;
  total_count: number;
};

export { TMarketHistoryModel, TMarketHistoryStatsModel };
