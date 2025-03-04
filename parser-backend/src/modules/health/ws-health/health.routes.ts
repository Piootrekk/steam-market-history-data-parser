import { FastifyInstance } from "fastify";
import { wsHeathController } from "./health.controller";
import { wsHealthSchema } from "./health.schema";

const healthWs = async (server: FastifyInstance) => {
  server.get(
    "/health",
    { websocket: true, schema: wsHealthSchema },
    wsHeathController
  );
};

export default healthWs;
