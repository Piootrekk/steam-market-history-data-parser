import { ObjectId } from "@fastify/mongodb";
import { TItemDTO } from "./items-coherence/items.types";

type TMarketHistoryModel = {
  _id: ObjectId;
  item: TItemDTO;
};

type TMarketHistoryStats = {
  _id: ObjectId;
  total_count: number;
};

export default TMarketHistoryModel;
