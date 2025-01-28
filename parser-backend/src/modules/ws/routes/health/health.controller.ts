import { FastifyRequest } from "fastify";
import CustomError from "@config/error-converter";
import { WebSocket } from "ws";
import { TFirstMessageRecieve, validateClientPayload } from "./health.schema";
import { handleCloseWsConnection } from "@modules/ws/ws-utils";

const wsHeathController = (connection: WebSocket, req: FastifyRequest) => {
  const recievedFromClient: TFirstMessageRecieve = { health: false };
  connection.on("message", (message: string) => {
    try {
      const parsedMessage = JSON.parse(message) as TFirstMessageRecieve;
      recievedFromClient.health = parsedMessage.health;

      if (recievedFromClient.health === false) {
        const error = {
          message: "Health check false",
          status: 400,
        };

        throw new CustomError(error);
      }
      if (!validateClientPayload(recievedFromClient)) {
        const error = {
          message: "Failed to validate client payload",
          status: 400,
        };
        throw new CustomError(error);
      }
      connection.send(
        JSON.stringify({
          approve: true,
        })
      );
    } catch (error) {
      connection.send(JSON.stringify({ error }));
    } finally {
      connection.removeAllListeners("message");
      connection.close(1000);
    }

    connection.on("close", (code, reason) => {
      try {
        handleCloseWsConnection(code, reason.toString());
      } catch (error) {
        connection.send(JSON.stringify({ error }));
      } finally {
        connection.removeAllListeners("message");
        connection.close(1000);
      }
    });
  });
};

export { wsHeathController };
