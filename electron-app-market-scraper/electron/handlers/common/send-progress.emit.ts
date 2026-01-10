import { ipcWebContentsAdapter } from "../../ipc-adapter/ipc.main.adapter";

const sendStartProgress = (
  webContents: Electron.WebContents,
  jobId: string
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    jobId,
    "info",
    dateNow,
    "Fetching has been started..."
  );
};

const sendFinishProgress = (
  webContents: Electron.WebContents,
  jobId: string
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    jobId,
    "finish",
    dateNow,
    "Fetching has been started..."
  );
};

const sendErrorProgress = (
  webContents: Electron.WebContents,
  error: Error,
  jobId: string
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:all:progress",
    jobId,
    "error",
    dateNow,
    `${error.message}`
  );
};

export { sendFinishProgress, sendStartProgress, sendErrorProgress };
