import { FastifyReply, FastifyRequest } from "fastify";
import {
  saveAllHistoryToDb,
  synchronizeHistoryToDb,
} from "./market-history.service";
import sseClient from "../../sse-client";
import CustomError from "../../../../config/error-converter";
import { clearAllHistor } from "../../../db/market-history/market-history.actions";
import { SSEMessageModel, TRequestBody } from "./market-history.schema";

const headers = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
};

const synchronizeHistory = async (
  request: FastifyRequest<{ Body: TRequestBody }>,
  reply: FastifyReply
) => {
  reply.raw.writeHead(200, headers);
  const client = sseClient.addClient<SSEMessageModel>(reply);
  try {
    const db = request.server.mongo.db;
    if (!db) {
      throw new CustomError({
        message: "Invalid database connection",
        statusCode: 500,
      });
    }
    await synchronizeHistoryToDb(
      request.body.steamid,
      client,
      db,
      request.body.cookies
    );
    sseClient.endStream(client);
  } catch (err) {
    const error = new CustomError(err);
    sseClient.setErrorMessage(client, error.message);
  } finally {
    request.raw.on("close", () => {
      sseClient.destroyClient(client.id);
    });
  }
};

const initAllMarketHistory = async (
  request: FastifyRequest<{ Body: TRequestBody }>,
  reply: FastifyReply
) => {
  reply.raw.writeHead(200, headers);
  const client = sseClient.addClient<SSEMessageModel>(reply);
  try {
    const db = request.server.mongo.db;
    if (!db) {
      throw new CustomError({
        message: "Invalid database connection",
        statusCode: 500,
      });
    }
    await clearAllHistor(request.body.steamid, db);
    await saveAllHistoryToDb(
      request.body.steamid,
      client,
      db,
      request.body.cookies
    );
    sseClient.endStream(client);
  } catch (err) {
    const error = new CustomError(err);
    sseClient.setErrorMessage(client, error.message);
  } finally {
    request.raw.on("close", () => {
      sseClient.destroyClient(client.id);
    });
  }
};

export { synchronizeHistory, initAllMarketHistory };
