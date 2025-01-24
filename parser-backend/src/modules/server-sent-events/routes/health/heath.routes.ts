import { FastifyInstance } from "fastify";
import { sseHealthSchema } from "./healh.schema";
import { sseHealthController } from "./health.controller";

const sseHealth = async (server: FastifyInstance) => {
  server.get("/sse-health", sseHealthSchema, sseHealthController);
};

export default sseHealth;
