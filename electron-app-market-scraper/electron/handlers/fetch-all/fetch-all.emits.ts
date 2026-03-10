import { ipcWebContentsAdapter } from "@electron/ipc-adapter/ipc.main.adapter";
import { getIconDownloaderEmitter } from "../common/icon-downloader/icon-downloader.emits";
import { getCommonProgressEmits } from "../common/send-progress.emits";

type ProgressEmitter = ReturnType<typeof getProgressEmitter>;

const getProgressEmitter = (webContents: Electron.WebContents) => {
  return {
    ...getCommonProgressEmits(webContents),
    ...getIconDownloaderEmitter(webContents),
    sendAccountCreated: (steamid: string) =>
      sendAccountCreated(webContents, steamid),

    sendDbInsertCorrectly: (listingsAmount: number) =>
      sendDbInsertCorrectly(webContents, listingsAmount),
    sendDownloadNewIcons: (newIcons: number) =>
      sendDownloadNewIcons(webContents, newIcons),
  };
};

const sendAccountCreated = (
  webContents: Electron.WebContents,
  steamid: string,
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:progress",
    "success",
    dateNow,
    `${steamid} inserted successfully.`,
  );
};

const sendDbInsertCorrectly = (
  webContents: Electron.WebContents,
  listingsAmount: number,
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:progress",
    "success",
    dateNow,
    `Listings: ${listingsAmount} inserted succesfully into db.`,
  );
};

const sendDownloadNewIcons = (
  webContents: Electron.WebContents,
  newIconsCount: number,
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:progress",
    "info",
    dateNow,
    newIconsCount
      ? `New ${newIconsCount} icons found.`
      : "No need download icons.",
  );
};

export { getProgressEmitter };
export type { ProgressEmitter };
