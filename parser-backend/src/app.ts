import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger";
import mongoDbPlugin from "./plugins/mongodb";

import allRoutes from "./plugins/routes";
import corsPlugin from "./plugins/cors";

const buildApp = async () => {
  const app = Fastify({
    logger: true,
  });

  await app.register(corsPlugin);
  await app.register(swaggerPlugin);
  await app.register(mongoDbPlugin);
  await app.register(allRoutes);
  return app;
};

export default buildApp;
