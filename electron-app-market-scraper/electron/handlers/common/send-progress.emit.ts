import { ipcWebContentsAdapter } from "../../ipc-adapter/ipc.main.adapter";

const sendStartProgress = (webContents: Electron.WebContents) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    "info",
    dateNow,
    "Fetching has been started..."
  );
};

const sendFinishProgress = (webContents: Electron.WebContents) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    "info",
    dateNow,
    "Fetching has been finished..."
  );
};

const sendErrorProgress = (webContents: Electron.WebContents, error: Error) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    "error",
    dateNow,
    `${error.name} | ${error.message}  ${error.cause ? `| ${error.cause}` : ""}`
  );
};

export { sendFinishProgress, sendStartProgress, sendErrorProgress };
