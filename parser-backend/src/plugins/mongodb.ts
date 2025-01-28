import fp from "fastify-plugin";
import fastifyMongodb from "@fastify/mongodb";
import { getMongoConnectionString } from "../config/env";

const mongoDbPlugin = fp(async (fastify) => {
  const mongodbConnectionString = getMongoConnectionString();
  fastify.register(fastifyMongodb, {
    url: mongodbConnectionString,
    forceClose: true,
    database: "Personal-data",
  });
  fastify.after(() => {
    if (fastify.mongo.db) {
      console.log("MongoDB connected successfully!");
    } else {
      throw new Error("Failed to connect mongoDB");
    }
  });
});
export default mongoDbPlugin;
