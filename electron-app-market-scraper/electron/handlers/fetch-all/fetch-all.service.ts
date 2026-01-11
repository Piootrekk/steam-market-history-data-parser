import { getDbInstance } from "../../db.config";
import {
  insertNewAccount,
  insertNewSnapshot,
  transactionSession,
} from "./fetch-all.repository";
import { sendStartProgress } from "../common/send-progress.emit";
import { sendAccountCreated } from "./fetch-all.emits";

const progressAllService = async (
  webContents: Electron.WebContents,
  steamid: string,
  cookies: string
) => {
  const db = getDbInstance();
  transactionSession(db, (tx) => {
    sendStartProgress(webContents);
    const accountId = insertNewAccount(tx, { steamId: steamid });
    sendAccountCreated(webContents, steamid);
    const newSnapshot = insertNewSnapshot(tx, { totalCount: 0, accountId });
    console.log(newSnapshot);
  });
};

export { progressAllService };
