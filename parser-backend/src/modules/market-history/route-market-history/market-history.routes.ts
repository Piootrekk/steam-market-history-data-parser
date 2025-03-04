import { FastifyInstance } from "fastify";
import {
  collectionsMarketNameSchema,
  itemsPerPageSchema,
} from "./market-history.schema";
import {
  collectionsMarketNameController,
  pageItemsController,
} from "./market-history.controller";

const marketHistoryRoute = async (server: FastifyInstance) => {
  server.get(
    "/collections-market",
    collectionsMarketNameSchema,
    collectionsMarketNameController
  );
  server.get("/documents", itemsPerPageSchema, pageItemsController);
};

export default marketHistoryRoute;
