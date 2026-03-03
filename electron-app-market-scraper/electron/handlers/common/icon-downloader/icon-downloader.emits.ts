import { ipcWebContentsAdapter } from "@electron/ipc-adapter/ipc.main.adapter";

type DownloadEmitter = ReturnType<typeof getIconDownloaderEmitter>;

const getIconDownloaderEmitter = (webContents: Electron.WebContents) => {
  return {
    sendStartCheckNewIcons: () => sendStartCheckNewIcons(webContents),
    sendDownloadNewIcons: (newIcons: number) =>
      sendDownloadNewIcons(webContents, newIcons),
    sendErrorLogs: (logs: string[]) => sendErrorLogs(webContents, logs),
  };
};

const sendStartCheckNewIcons = (webContents: Electron.WebContents) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:progress",
    "info",
    dateNow,
    "Checking new available icons...",
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

const sendErrorLogs = (webContents: Electron.WebContents, logs: string[]) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:progress",
    logs.length > 0 ? "warning" : "success",
    dateNow,
    logs.length > 0
      ? `Invalid attempts download images: ${logs.toString()}.`
      : `All images downloaded successfully.`,
  );
};

export { getIconDownloaderEmitter };
export type { DownloadEmitter };
