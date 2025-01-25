import { FastifyInstance } from "fastify";
import { allMarketHistoryController } from "./market-history.controller";

const wsMarketHistoryRoutes = async (server: FastifyInstance) => {
  server.get("/all", { websocket: true }, allMarketHistoryController);
};

export default wsMarketHistoryRoutes;
