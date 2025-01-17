import { FastifyReply, FastifyRequest } from "fastify";
import {
  saveAllHistoryToDb,
  synchronizeHistoryToDb,
} from "./market-history.service";
import sseClient from "../../sse-client";
import CustomError from "../../../../config/error-converter";
import { clearAllHistor } from "../../../db/market-history/market-history.actions";

const headers = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
};

type TRequestBody = {
  steamid: string;
};

const synchronizeHistory = async (
  request: FastifyRequest<{ Body: TRequestBody }>,
  reply: FastifyReply
) => {
  reply.raw.writeHead(200, headers);
  const client = sseClient.addClient(reply);
  try {
    const db = request.server.mongo.db;
    if (!db) {
      throw new CustomError({
        message: "Invalid database connection",
        statusCode: 500,
      });
    }
    await synchronizeHistoryToDb(request.body.steamid, client, db);
    reply.raw.write(`data: ${JSON.stringify({ success: true })}`);
    reply.raw.end();
  } catch (err) {
    const error = new CustomError(err);
    reply.raw.write(JSON.stringify({ message: error.message }));
    reply.raw.end();
  }
};

const initAllMarketHistory = async (
  request: FastifyRequest<{ Body: TRequestBody }>,
  reply: FastifyReply
) => {
  reply.raw.writeHead(200, headers);
  const client = sseClient.addClient(reply);
  try {
    const db = request.server.mongo.db;
    if (!db) {
      throw new CustomError({
        message: "Invalid database connection",
        statusCode: 500,
      });
    }
    await clearAllHistor(request.body.steamid, db);
    await saveAllHistoryToDb(request.body.steamid, client, db);
    reply.raw.write(`data: ${JSON.stringify({ success: true })}`);
    reply.raw.end();
  } catch (err) {
    const error = new CustomError(err);
    reply.raw.write(JSON.stringify({ message: error.message }));
    reply.raw.end();
  }
  request.raw.on("close", () => {
    sseClient.removeClient(client.id);
  });
};

export { synchronizeHistory, initAllMarketHistory };
