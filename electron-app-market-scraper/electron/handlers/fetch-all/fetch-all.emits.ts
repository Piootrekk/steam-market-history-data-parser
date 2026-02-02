import { ipcWebContentsAdapter } from "../../ipc-adapter/ipc.main.adapter";
import { getCommonProgressEmits } from "../common/send-progress.emits";

type ProgressEmitter = ReturnType<typeof getProgressEmitter>;

const getProgressEmitter = (webContents: Electron.WebContents) => {
  return {
    sendAccountCreated: (steamid: string) =>
      sendAccountCreated(webContents, steamid),
    sendMessageFromFetchQueue: (
      message: string,
      status: "warning" | "success" | "info",
    ) => sendMessageFromFetchQueue(webContents, message, status),
    sendDbInsertCorrectly: (listingsAmount: number) =>
      sendDbInsertCorrectly(webContents, listingsAmount),
    ...getCommonProgressEmits(webContents),
  };
};

const sendAccountCreated = (
  webContents: Electron.WebContents,
  steamid: string,
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    "success",
    dateNow,
    `${steamid} inserted successfully.`,
  );
};

const sendMessageFromFetchQueue = (
  webContents: Electron.WebContents,
  message: string,
  status: "warning" | "success" | "info",
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    status,
    dateNow,
    message,
  );
};

const sendDbInsertCorrectly = (
  webContents: Electron.WebContents,
  listingsAmount: number,
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    "success",
    dateNow,
    `Listings: ${listingsAmount} inserted succesfully into db.`,
  );
};

export { getProgressEmitter };
export type { ProgressEmitter };
