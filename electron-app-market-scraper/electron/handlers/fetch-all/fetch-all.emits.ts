import { ipcWebContentsAdapter } from "../../ipc-adapter/ipc.main.adapter";

const sendAccountCreated = (
  webContents: Electron.WebContents,
  steamid: string
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    "success",
    dateNow,
    `${steamid} inserted successfully.`
  );
};

const sendMessageFromFetchQueue = (
  webContents: Electron.WebContents,
  message: string,
  status: "warning" | "success" | "info"
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    status,
    dateNow,
    message
  );
};

const sendDbInsertCorrecty = (
  webContents: Electron.WebContents,
  listingsAmount: number
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    "success",
    dateNow,
    `Listings: ${listingsAmount} inserted succesfully into db.`
  );
};

export { sendAccountCreated, sendMessageFromFetchQueue, sendDbInsertCorrecty };
