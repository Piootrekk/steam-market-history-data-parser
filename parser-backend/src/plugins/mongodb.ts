import fp from "fastify-plugin";
import fastifyMongodb from "@fastify/mongodb";
import { getMongoConnectionString } from "../config/env";

const mongoDbPlugin = fp(async (fastify) => {
  const mongodbConnectionString = getMongoConnectionString();
  fastify.register(fastifyMongodb, {
    url: mongodbConnectionString,
  });
});

export default mongoDbPlugin;
