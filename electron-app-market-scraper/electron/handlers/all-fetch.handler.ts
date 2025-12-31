import { randomUUID } from "crypto";
import { ipcWebContentsAdapter } from "..//ipc-adapter/ipc.main.adapter";

const startFetchingAll = async (
  event: Electron.IpcMainInvokeEvent,
  steamid: string,
  cookies: string
) => {
  const jobId = randomUUID();
  const webContents = event.sender;
  progressFetchingAll(webContents, jobId, steamid, cookies);
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
      current,
      total,
      status,
      timestamp,
      message
    );
    console.log("SEND xDD ", { current, total, status, message });
  }
};

export { startFetchingAll };
