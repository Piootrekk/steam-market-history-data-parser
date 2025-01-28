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

const synchronizeHistoryController = async (
  connection: WebSocket,
  request: FastifyRequest
) => {
  const db = getDatabase(request);
  connection.on("message", async (message: string) => {
    try {
      const recieved = recieveFirstMessage(message);
      await synchronizeHistoryToDb(
        recieved.steamid,
        connection,
        db,
        recieved.cookies
      );
    } catch (error) {
    } finally {
      connection.removeAllListeners("message");
      connection.close(1000);
    }
  });

  connection.on("close", (code, reason) => {
    try {
      handleCloseWsConnection(code, reason.toString());
    } catch (error) {
      connection.send(JSON.stringify({ error: error }));
    } finally {
      connection.removeAllListeners("message");
      connection.close(1000);
    }
  });
};

const allMarketHistoryController = async (
  connection: WebSocket,
  request: FastifyRequest
) => {
  const db = getDatabase(request);
  let received: TFirstMessageRecieve;
  connection.on("message", async (message: string) => {
    try {
      received = recieveFirstMessage(message);
      await clearAllHistor(received.steamid, db);
      await saveAllHistoryToDb(
        received.steamid,
        connection,
        db,
        received.cookies
      );
    } catch (error) {
      connection.send(JSON.stringify({ error: error }));
      if (received.steamid) await clearAllHistor(received.steamid, db);
    } finally {
      connection.removeAllListeners("message");
      connection.close(1000);
    }
  });
  connection.on("close", async (code, reason) => {
    try {
      handleCloseWsConnection(code, reason.toString());
    } catch (error) {
      connection.send(JSON.stringify({ error: error }));
      if (received.steamid) await clearAllHistor(received.steamid, db);
    } finally {
      connection.removeAllListeners("message");
      connection.close(1000);
    }
  });
};

export { allMarketHistoryController, synchronizeHistoryController };
