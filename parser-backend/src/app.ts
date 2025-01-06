import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger";
import healthRoutes from "./modules/routes/health/health.route";

const buildApp = async () => {
  const app = Fastify({
    logger: true,
  });
  await app.register(swaggerPlugin);
  await app.register(healthRoutes, { prefix: "/health" });
  return app;
};

export default buildApp;
