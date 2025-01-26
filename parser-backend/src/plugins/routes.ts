import fp from "fastify-plugin";
import inventoryHistory from "../modules/routes/inventory-history/market-history.routes";
import marketHistory from "../modules/routes/market-history/market-history.routes";
import wsMarketHistory from "../modules/ws/routes/market-history/market-history.routes";

const allRoutes = fp(async (fastify) => {
  await fastify.register(wsMarketHistory, { prefix: "/ws" });
  await fastify.register(marketHistory, { prefix: "/market" });
  await fastify.register(inventoryHistory, { prefix: "/inventory" });
});

export default allRoutes;
