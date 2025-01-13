import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger";
import healthRoutes from "./modules/routes/health/health.routes";
import mongoDbPlugin from "./plugins/mongodb";

const buildApp = async () => {
  const app = Fastify({
    logger: true,
  });
  await app.register(swaggerPlugin);
  await app.register(mongoDbPlugin);
  await app.register(healthRoutes, { prefix: "/health" });
  return app;
};

export default buildApp;
