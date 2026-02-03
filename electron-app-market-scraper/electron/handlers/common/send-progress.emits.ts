import { ipcWebContentsAdapter } from "../../ipc-adapter/ipc.main.adapter";

type CommonProgressEmitter = ReturnType<typeof getCommonProgressEmits>;

const getCommonProgressEmits = (webContents: Electron.WebContents) => {
  return {
    sendStartProgress: () => sendStartProgress(webContents),
    sendFinishProgress: () => sendFinishProgress(webContents),
    sendErrorProgress: (error: Error) => sendErrorProgress(webContents, error),
    sendMessage: (message: string, status: "warning" | "success" | "info") =>
      sendMessage(webContents, message, status),
  };
};

const sendStartProgress = (webContents: Electron.WebContents) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:progress",
    "info",
    dateNow,
    "Fetching has been started...",
  );
};

const sendFinishProgress = (webContents: Electron.WebContents) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:progress",
    "info",
    dateNow,
    "Fetching has been finished...",
  );
};

const sendErrorProgress = (webContents: Electron.WebContents, error: Error) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:progress",
    "error",
    dateNow,
    `${error.cause ? error.cause : error.message}`,
  );
};

const sendMessage = (
  webContents: Electron.WebContents,
  message: string,
  status: "warning" | "success" | "info",
) => {
  const dateNow = Date.now();
  ipcWebContentsAdapter.send(
    webContents,
    "fetch:progress",
    status,
    dateNow,
    message,
  );
};

export { getCommonProgressEmits };
export type { CommonProgressEmitter };
