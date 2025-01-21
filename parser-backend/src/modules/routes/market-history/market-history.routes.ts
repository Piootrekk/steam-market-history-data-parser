import { FastifyInstance } from "fastify";
import { healthSchema } from "./market-history.schema";
import { getCollectionsMarketName } from "./market-history.controller";

const marketHistory = async (server: FastifyInstance) => {
  server.get("/collections-market", healthSchema, getCollectionsMarketName);
};

export default marketHistory;
