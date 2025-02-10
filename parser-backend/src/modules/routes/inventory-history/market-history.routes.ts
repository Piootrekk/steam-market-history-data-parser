import { FastifyInstance } from "fastify";
import { inventoryHistorySchema } from "./market-history.schema";
import { getCollectionsMarketName } from "./market-history.controller";

const inventoryHistory = async (server: FastifyInstance) => {
  server.get(
    "/collections-inventory",
    inventoryHistorySchema,
    getCollectionsMarketName
  );
};

export default inventoryHistory;
