import { FastifyInstance } from "fastify";
import { getMarketHistory, getSynchronize } from "./market-history.controller";
import {
  marketHistorySchema,
  marketSynchronizeSchema,
} from "./market-history.schema";

const marketHistoryRoutes = async (server: FastifyInstance) => {
  server.get("/all", marketHistorySchema, getMarketHistory);
  server.get("/synchronize", marketSynchronizeSchema, getSynchronize);
};

export default marketHistoryRoutes;
