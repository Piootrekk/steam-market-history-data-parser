import { FastifyReply, FastifyRequest } from "fastify";
import { saveAllHistoryToDb } from "./market-history.service";
import sseClient from "../../sse-client";

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

  await saveAllHistoryToDb(request.body.steamid, client);

  request.raw.on("close", () => {
    sseClient.removeClient(client.id);
  });
};

export { synchronizeHistory, initAllMarketHistory };
