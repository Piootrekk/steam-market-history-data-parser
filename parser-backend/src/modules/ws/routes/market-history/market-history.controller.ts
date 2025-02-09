import { FastifyRequest } from "fastify";
import {
  recieveFirstMessage,
  saveAllHistoryToDb,
  synchronizeHistoryToDb,
} from "./market-history.service";
import { clearAllHistor } from "@modules/db/market-history/market-history.actions";
import { getDatabase } from "@/config/get-database";
import { WebSocket } from "ws";
import { handleCloseWsConnection } from "@modules/ws/ws-utils";
import { TFirstMessageRecieve } from "./market-history.schema";
import CustomError from "@/config/error-converter";

const synchronizeHistoryController = async (
  connection: WebSocket,
  request: FastifyRequest
) => {
  const db = getDatabase(request);
  let connectionClosed = false;
  connection.on("message", async (message: string) => {
    try {
      const recieved = recieveFirstMessage(message);

      await synchronizeHistoryToDb(
        recieved.steamid,
        connection,
        db,
        recieved.cookies,
        () => connectionClosed
      );
      connection.close(1000, "Success with all fetches");
    } catch (error) {
      connection.close(1000, new CustomError({ unknownError: error }).message);
    } finally {
      connection.removeAllListeners("message");
    }
  });

  connection.on("close", (code, reason) => {
    connectionClosed = true;
    try {
      handleCloseWsConnection(code, reason.toString());
    } catch (error) {
      connection.send(
        JSON.stringify({ error: `Connection close, code: ${code}` })
      );
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
  connection.on("message", async (message: string) => {
    try {
      received = recieveFirstMessage(message);
      await clearAllHistor(received.steamid, db);
      await saveAllHistoryToDb(
        received.steamid,
        connection,
        db,
        received.cookies,
        () => connectionClosed
      );
      connection.close(1000, "Success with all fetches");
    } catch (error) {
      connection.close(1000, new CustomError({ unknownError: error }).message);
      if (received && received.steamid)
        await clearAllHistor(received.steamid, db);
    } finally {
      connection.removeAllListeners("message");
    }
  });
  connection.on("close", async (code, reason) => {
    connectionClosed = true;
    try {
      handleCloseWsConnection(code, reason.toString());
    } catch (error) {
      connection.close(1000, `Error with close ${code}`);
    }
  });
};

export { allMarketHistoryController, synchronizeHistoryController };
