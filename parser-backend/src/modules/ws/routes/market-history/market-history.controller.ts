import { FastifyRequest } from "fastify";
import {
  recieveFirstMessage,
  saveAllHistoryToDb,
  synchronizeHistoryToDb,
} from "./market-history.service";
import { clearAllHistory } from "@modules/db/market-history/market-history.actions";
import { getDatabase } from "@/config/get-database";
import { WebSocket } from "ws";
import {
  handleCloseWsConnection,
  setTimeOutWSHandshake,
  wsCloseByError,
  wsCloseCorrectly,
} from "@modules/ws/ws-utils";
import { TFirstMessageRecieve } from "./market-history.schema";
import CustomError from "@/config/error-converter";

const synchronizeHistoryController = async (
  connection: WebSocket,
  request: FastifyRequest
) => {
  const db = getDatabase(request);
  let connectionClosed = false;
  const timeout = setTimeOutWSHandshake(connection);
  connection.on("message", async (message: string) => {
    try {
      const recieved = recieveFirstMessage(message);
      clearTimeout(timeout);
      await synchronizeHistoryToDb(
        recieved.steamid,
        connection,
        db,
        recieved.cookies,
        () => connectionClosed
      );
      wsCloseCorrectly(connection, "Success with all fetches");
    } catch (error) {
      const customError = new CustomError({ unknownError: error });
      wsCloseByError(connection, customError.message);
    } finally {
      connection.removeAllListeners("message");
      clearTimeout(timeout);
    }
  });

  connection.on("close", (code, reason) => {
    connectionClosed = true;
    try {
      handleCloseWsConnection(code, reason.toString());
    } catch (error) {
      wsCloseByError(connection, `Error with close ${code}`);
    }
  });
};

const allMarketHistoryController = async (
  connection: WebSocket,
  request: FastifyRequest
) => {
  const db = getDatabase(request);
  let received: TFirstMessageRecieve;
  let connectionClosed = false;
  const timeout = setTimeOutWSHandshake(connection);
  connection.on("message", async (message: string) => {
    try {
      received = recieveFirstMessage(message);
      clearTimeout(timeout);
      await clearAllHistory(received.steamid, db);
      await saveAllHistoryToDb(
        received.steamid,
        connection,
        db,
        received.cookies,
        () => connectionClosed
      );
      wsCloseCorrectly(connection, "Success with all fetches");
    } catch (error) {
      const customError = new CustomError({ unknownError: error });
      wsCloseByError(connection, customError.message);
      if (received && received.steamid)
        await clearAllHistory(received.steamid, db);
    } finally {
      connection.removeAllListeners("message");
      clearTimeout(timeout);
    }
  });
  connection.on("close", async (code, reason) => {
    connectionClosed = true;
    try {
      handleCloseWsConnection(code, reason.toString());
    } catch (error) {
      wsCloseByError(connection, `Error with close ${code}`);
      if (received && received.steamid)
        await clearAllHistory(received.steamid, db);
    }
  });
};

export { allMarketHistoryController, synchronizeHistoryController };
