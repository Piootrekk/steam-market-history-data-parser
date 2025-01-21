import fp from "fastify-plugin";
import healthRoutes from "../modules/routes/health/health.routes";
import inventoryHistory from "../modules/routes/inventory-history/market-history.routes";
import marketHistory from "../modules/routes/market-history/market-history.routes";
import marketHistoryRoutesSSE from "../modules/server-sent-events/routes/market-history/market-history.routes";

const allRoutes = fp(async (fastify) => {
  await fastify.register(healthRoutes, { prefix: "/health" });
  await fastify.register(marketHistoryRoutesSSE, { prefix: "/market" });
  await fastify.register(marketHistory, { prefix: "/market" });
  await fastify.register(inventoryHistory, { prefix: "/inventory" });
});

export default allRoutes;
