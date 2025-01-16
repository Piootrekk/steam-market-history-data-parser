import { FastifyReply, FastifyRequest } from "fastify";
import { saveAllHistoryToDb } from "./market-history.service";
import sseClient from "../../sse-client";
import CustomError from "../../../../config/error-converter";

const synchronizeHistory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {};

type TRequestBody = {
  steamid: string;
};

const initAllMarketHistory = async (
  request: FastifyRequest<{ Body: TRequestBody }>,
  reply: FastifyReply
) => {
  const client = sseClient.addClient(reply);
  reply.raw.setHeader("Content-Type", "text/event-stream");
  reply.raw.setHeader("Cache-Control", "no-cache");
  reply.raw.setHeader("Connection", "keep-alive");
  reply.raw.setHeader("Transfer-Encoding", "chunked");

  const db = request.server.mongo.db;
  if (!db) {
    throw new CustomError({
      message: "Invalid database connection",
      statusCode: 500,
    });
  }
  await saveAllHistoryToDb(request.body.steamid, client, db);

  request.raw.on("close", () => {
    sseClient.removeClient(client.id);
  });
};

export { synchronizeHistory, initAllMarketHistory };
