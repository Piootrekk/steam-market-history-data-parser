import Fastify from "fastify";
import swaggerPlugin from "./plugins/swagger";
import mongoDbPlugin from "./plugins/mongodb";

import allModules from "./modules/module";
import corsPlugin from "./plugins/cors";
import wsPlugin from "./plugins/ws";

const buildApp = async () => {
  const app = Fastify({
    logger: false,
  });

  await app.register(corsPlugin);
  await app.register(swaggerPlugin);
  await app.register(mongoDbPlugin);
  await app.register(wsPlugin);
  // await app.register(allRoutes);
  app.register(allModules);
  return app;
};

export default buildApp;
