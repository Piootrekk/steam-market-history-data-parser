import { FastifyReply, FastifyRequest } from "fastify";
import sseClient from "../../sse-client";
import { SSEHeathModel } from "./healh.schema";
import CustomError from "../../../../config/error-converter";

const headers = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
};

const sseHealthController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  reply.raw.writeHead(200, headers);
  const client = sseClient.addClient<SSEHeathModel>(reply);
  try {
    let i = 0;
    const intervalId = setInterval(() => {
      sseClient.sendMessage(client, { count: i });
      if (i === 10) {
        clearInterval(intervalId);
        sseClient.endStream(client);
      }
      i++;
    }, 1000);
    console.log("here");
  } catch (err) {
    const error = new CustomError(err);
    sseClient.setErrorMessage(client, error.message);
  } finally {
    request.raw.on("close", () => {
      sseClient.destroyClient(client.id);
    });
  }
};

export { sseHealthController };
