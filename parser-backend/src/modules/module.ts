import { FastifyInstance, FastifyPluginAsync } from "fastify";
import healthWs from "./health/ws-health/health.routes";
import inventoryHistoryRoute from "./inventory-history/route-inventory-history/inventory-history.routes";
import marketHistoryRoute from "./market-history/route-market-history/market-history.routes";
import marketHistoryWs from "./market-history/ws-market-history/market-history.routes";

const moduleMerger: FastifyPluginAsync = async (
  fastifyInstance: FastifyInstance
) => {
  await fastifyInstance.register(healthWs, { prefix: "/ws" });
  await fastifyInstance.register(inventoryHistoryRoute, {
    prefix: "/inventory",
  });
  await fastifyInstance.register(marketHistoryRoute, { prefix: "/market" });
  await fastifyInstance.register(marketHistoryWs, { prefix: "/ws" });
};

export default moduleMerger;
