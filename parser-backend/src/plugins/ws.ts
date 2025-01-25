import fp from "fastify-plugin";
import fastifyWebsocket from "@fastify/websocket";

const wsPlugin = fp(async (fastify) => {
  await fastify.register(fastifyWebsocket);
});

export default wsPlugin;
