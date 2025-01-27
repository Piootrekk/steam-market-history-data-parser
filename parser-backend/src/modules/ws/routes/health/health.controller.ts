import { FastifyRequest } from "fastify";
import CustomError from "../../../../config/error-converter";
import { WebSocket } from "ws";
import {
  TFirstMessageRecieve,
  TSendMessage,
  validateClientPayload,
} from "./health.schema";

const wsHeathController = (connection: WebSocket, req: FastifyRequest) => {
  try {
    const recievedFromClient: TFirstMessageRecieve = { health: false };

    connection.on("message", (message: string) => {
      const parsedMessage = JSON.parse(message) as TFirstMessageRecieve;
      recievedFromClient.health = parsedMessage.health;

      if (recievedFromClient.health === false) {
        const error = {
          message: "Health check false",
          status: 400,
        };

        connection.send(JSON.stringify({ error }));
        connection.close();
        return;
      }
      if (!validateClientPayload(recievedFromClient)) {
        const error = {
          message: "Failed to validate client payload",
          status: 400,
        };
        connection.send(JSON.stringify({ error }));
        connection.close();
      }

      const messageToSend: TSendMessage = {
        approve: true,
      };
      connection.send(JSON.stringify(messageToSend));
      connection.removeAllListeners("message");
      connection.close();
    });
  } catch (err) {
    const error = new CustomError(err);
    connection.send(JSON.stringify({ error: error }));
  }
};

export { wsHeathController };
