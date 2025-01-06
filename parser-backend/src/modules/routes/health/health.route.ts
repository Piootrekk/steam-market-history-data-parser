import { FastifyInstance } from "fastify";
import { healthSchema } from "./health.schema";
import { getHealth } from "./health.controller";

const healthRoutes = async (server: FastifyInstance) => {
  server.get(
    "/",
    {
      schema: {
        response: {
          200: healthSchema,
        },
      },
    },
    getHealth
  );
};

export default healthRoutes;
