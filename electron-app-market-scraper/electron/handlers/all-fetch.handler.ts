import { randomUUID } from "crypto";
import { ipcWebContentsAdapter } from "..//ipc-adapter/ipc.main.adapter";
import { getDbInstance } from "../db.config";
import { transactionSession } from "../core/db/queries/transaction";
import { sanitizeError } from "../error";

const startFetchingAll = async (
  event: Electron.IpcMainInvokeEvent,
  steamid: string,
  cookies: string
) => {
  const jobId = randomUUID();
  const webContents = event.sender;
  progressFetchingAllTest(webContents, jobId, steamid, cookies);
  return { jobId };
};

const test = async (iteration: number) => {
  return {
    current: iteration,
    status: "success",
    message: "correct fetch",
  };
};

const progressFetchingAllTest = async (
  webContents: Electron.WebContents,
  jobId: string,
  steamid: string,
  cookies: string
) => {
  const total = 5;
  for (let index = 1; index <= total; index++) {
    const { current, status, message } = await test(index);
    const timestamp = Date.now();
    ipcWebContentsAdapter.send(
      webContents,
      "fetch:all:progress",
      jobId,
      status,
      timestamp,
      message
    );
    console.log("SEND xDD ", { current, total, status, message });
  }
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    jobId,
    "error",
    Date.now(),
    "-==END==-"
  );
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    jobId,
    "finish",
    Date.now(),
    "-end-"
  );
};

const progressFetchingAll = async (
  webContents: Electron.WebContents,
  jobId: string,
  steamid: string,
  cookies: string
) => {
  const db = getDbInstance();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    jobId,
    "info",
    Date.now(),
    "-==START==-"
  );
  await transactionSession(db, async (tx) => {
    try {
    } catch (err) {
      const error = sanitizeError(err);
      ipcWebContentsAdapter.send(
        webContents,
        "fetch:all:progress",
        jobId,
        "info",
        Date.now(),
        `${error.message}`
      );
    }
  });
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    jobId,
    "finish",
    Date.now(),
    "-==END==-"
  );
};

export { startFetchingAll, progressFetchingAll };
