import { randomUUID } from "crypto";
import { ipcWebContentsAdapter } from "..//ipc-adapter/ipc.main.adapter";

const startFetchingAll = async (
  event: Electron.IpcMainInvokeEvent,
  steamid: string,
  cookies: string
) => {
  const jobId = randomUUID();
  const webContents = event.sender;
  progressFetchingAll(webContents, steamid, cookies);
  return { jobId };
};

const sleep = async (timeMs: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
};

const test = async (iteration: number) => {
  await sleep(5000);
  return {
    current: iteration,
    status: "success",
    message: "correct fetch",
  };
};

const progressFetchingAll = async (
  webContents: Electron.WebContents,
  steamid: string,
  cookies: string
) => {
  const total = 5;
  for (let index = 1; index <= total; index++) {
    const { current, status, message } = await test(index);
    ipcWebContentsAdapter.send(
      webContents,
      "fetch:all:progress",
      current,
      total,
      status,
      message
    );
    console.log("SEND xDD ", { current, total, status, message });
  }
};

export { startFetchingAll };
