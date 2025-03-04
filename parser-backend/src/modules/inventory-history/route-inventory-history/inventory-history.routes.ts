import { FastifyInstance } from "fastify";
import { inventoryHistorySchema } from "./inventory-history.schema";
import { getCollectionsMarketName } from "./inventory-history.controller";

const inventoryHistoryRoute = async (server: FastifyInstance) => {
  server.get(
    "/collections-inventory",
    inventoryHistorySchema,
    getCollectionsMarketName
  );
};

export default inventoryHistoryRoute;
