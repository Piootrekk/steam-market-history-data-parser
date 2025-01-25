import fp from "fastify-plugin";
import healthRoutes from "../modules/routes/health/health.routes";
import inventoryHistory from "../modules/routes/inventory-history/market-history.routes";
import marketHistory from "../modules/routes/market-history/market-history.routes";
import marketHistoryRoutesSSE from "../modules/ws/routes/market-history/market-history.routes";
import sseHealth from "../modules/ws/routes/health/heath.routes";

const allRoutes = fp(async (fastify) => {
  await fastify.register(healthRoutes, { prefix: "/health" });
  await fastify.register(marketHistoryRoutesSSE, { prefix: "/market" });
  await fastify.register(marketHistory, { prefix: "/market" });
  await fastify.register(inventoryHistory, { prefix: "/inventory" });
  await fastify.register(sseHealth);
});

export default allRoutes;
