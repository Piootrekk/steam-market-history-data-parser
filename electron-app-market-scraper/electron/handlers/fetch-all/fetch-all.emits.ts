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

export { sendAccountCreated };
