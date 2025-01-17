import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger";
import mongoDbPlugin from "./plugins/mongodb";

import healthRoutes from "./modules/routes/health/health.routes";
import marketHistoryRoutes from "./modules/server-sent-events/routes/market-history/market-history.routes";

const buildApp = async () => {
  const app = Fastify({
    logger: true,
  });
  await app.register(swaggerPlugin);
  await app.register(mongoDbPlugin);
  await app.register(healthRoutes, { prefix: "/health" });
  await app.register(marketHistoryRoutes, { prefix: "/market" });
  return app;
};

export default buildApp;
