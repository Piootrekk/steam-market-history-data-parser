import { FastifyInstance } from "fastify";
import {
  initAllMarketHistory,
  synchronizeHistory,
} from "./market-history.controller";
import {
  marketHistorySchema,
  marketSynchronizeSchema,
} from "./market-history.schema";

const marketHistoryRoutes = async (server: FastifyInstance) => {
  server.post("/all", marketHistorySchema, initAllMarketHistory);
  server.post("/synchronize", marketSynchronizeSchema, synchronizeHistory);
};

export default marketHistoryRoutes;
