import { FastifyInstance } from "fastify";
import {
  allMarketHistoryController,
  synchronizeHistoryController,
} from "./market-history.controller";
import { wsMarketHistorySchema } from "./market-history.schema";

const wsMarketHistoryRoutes = async (server: FastifyInstance) => {
  server.get(
    "/market-history/all",
    { websocket: true, schema: wsMarketHistorySchema },
    allMarketHistoryController
  );
  server.get(
    "/market-history/sync",
    { websocket: true, schema: wsMarketHistorySchema },
    synchronizeHistoryController
  );
};

export default wsMarketHistoryRoutes;
