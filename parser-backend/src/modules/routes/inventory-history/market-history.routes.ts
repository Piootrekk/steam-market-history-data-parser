import { FastifyInstance } from "fastify";
import { healthSchema } from "./market-history.schema";
import { getCollectionsMarketName } from "./market-history.controller";

const inventoryHistory = async (server: FastifyInstance) => {
  server.get("/collections-inventory", healthSchema, getCollectionsMarketName);
};

export default inventoryHistory;
