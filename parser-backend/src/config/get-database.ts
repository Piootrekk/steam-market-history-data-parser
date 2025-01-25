import { FastifyRequest } from "fastify";
import { Db } from "mongodb";
export const getDatabase = (request: FastifyRequest): Db => {
  const db = request.server.mongo.db;
  if (db === undefined) {
    throw new Error("MongoDB connection is not available");
  }
  return db;
};
