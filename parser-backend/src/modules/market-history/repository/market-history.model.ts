import { ObjectId } from "@fastify/mongodb";
import { TItemDTO } from "../ws-market-history/items-coherence/items.types";

type TMarketHistoryModel = {
  _id?: ObjectId;
} & TItemDTO;

type TMarketActions = "Bought" | "Cancel" | "Sold" | "Create";

type TMarketGames = "730" | "252490" | "440" | "Others";

export { TMarketHistoryModel, TMarketActions, TMarketGames };
