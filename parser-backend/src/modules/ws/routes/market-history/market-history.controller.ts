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

const synchronizeHistory = async (
  connection: WebSocket,
  request: FastifyRequest
) => {
  try {
    const db = getDatabase(request);
    const recieved = recieveFirstMessage(connection);
    await synchronizeHistoryToDb(
      recieved.steamid,
      connection,
      db,
      recieved.cookies
    );
  } catch (err) {
    const error = new CustomError(err);
    connection.send(JSON.stringify({ error: error }));
  } finally {
    connection.close();
  }
};

const allMarketHistoryController = async (
  connection: WebSocket,
  request: FastifyRequest
) => {
  try {
    const db = getDatabase(request);
    const recieved = recieveFirstMessage(connection);
    await clearAllHistor(recieved.steamid, db);
    await saveAllHistoryToDb(
      recieved.steamid,
      connection,
      db,
      recieved.cookies
    );
  } catch (err) {
    const error = new CustomError(err);
    connection.send(JSON.stringify({ error: error }));
  } finally {
    connection.close();
  }
};

export { allMarketHistoryController, synchronizeHistory };
