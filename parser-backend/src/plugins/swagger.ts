import fp from "fastify-plugin";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";

const swaggerPlugin = fp(async (fastify) => {
  await fastify.register(FastifySwagger, {
    openapi: {
      info: {
        title: "Steam personal data parser",
        version: "1.0.0",
      },
    },
  });

  await fastify.register(FastifySwaggerUi, {
    routePrefix: "/",
  });
});

export default swaggerPlugin;
