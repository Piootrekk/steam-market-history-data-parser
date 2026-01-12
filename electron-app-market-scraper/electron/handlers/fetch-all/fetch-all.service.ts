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
  await transactionSession(db, async (tx) => {
    sendStartProgress(webContents);
    const accountId = await insertNewAccount(tx, { steamId: steamid });
    sendAccountCreated(webContents, steamid);
    const newSnapshot = await insertNewSnapshot(tx, {
      totalCount: 0,
      accountId,
    });
    console.log(newSnapshot);
    // await fetchbulk; ///30 times sendlog and insert every fetch
  });
};

export { progressAllService };
