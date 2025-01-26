import { FastifyInstance } from "fastify";
import {
  allMarketHistoryController,
  synchronizeHistory,
} from "./market-history.controller";

const wsMarketHistoryRoutes = async (server: FastifyInstance) => {
  server.get(
    "/market-history/all",
    { websocket: true },
    allMarketHistoryController
  );
  server.get("/market-history/sync", { websocket: true }, synchronizeHistory);
};

export default wsMarketHistoryRoutes;
