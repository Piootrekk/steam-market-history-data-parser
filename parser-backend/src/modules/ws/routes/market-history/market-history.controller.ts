import { FastifyRequest } from "fastify";
import {
  recieveFirstMessage,
  saveAllHistoryToDb,
  synchronizeHistoryToDb,
} from "./market-history.service";
import CustomError from "../../../../config/error-converter";
import { clearAllHistor } from "../../../db/market-history/market-history.actions";
import { getDatabase } from "../../../../config/get-database";
import { WebSocket } from "ws";

const synchronizeHistoryController = async (
  connection: WebSocket,
  request: FastifyRequest
) => {
  try {
    const db = getDatabase(request);
    connection.on("message", async (message: string) => {
      const recieved = recieveFirstMessage(message);
      await synchronizeHistoryToDb(
        recieved.steamid,
        connection,
        db,
        recieved.cookies
      );
      connection.removeAllListeners("message");
      connection.close();
    });
  } catch (err) {
    const error = new CustomError(err);
    connection.send(JSON.stringify({ error: error }));
  }
};

const allMarketHistoryController = async (
  connection: WebSocket,
  request: FastifyRequest
) => {
  try {
    const db = getDatabase(request);
    connection.on("message", async (message: string) => {
      const recieved = recieveFirstMessage(message);
      await clearAllHistor(recieved.steamid, db);
      await saveAllHistoryToDb(
        recieved.steamid,
        connection,
        db,
        recieved.cookies
      );
      connection.removeAllListeners("message");
      connection.close();
    });
  } catch (err) {
    const error = new CustomError(err);
    connection.send(JSON.stringify({ error: error }));
  }
};

export { allMarketHistoryController, synchronizeHistoryController };
