import { randomUUID } from "crypto";
import { progressAllService } from "./fetch-all.service";
import { sanitizeError } from "../../error";
import { sendErrorProgress } from "../common/send-progress.emit";

const fetchAllController = async (
  event: Electron.IpcMainInvokeEvent,
  steamid: string,
  cookies: string
) => {
  const jobId = randomUUID();
  const webContents = event.sender;
  await progressAllController(webContents, steamid, cookies);
  return { jobId };
};

const progressAllController = async (
  webContents: Electron.WebContents,
  steamid: string,
  cookies: string
) => {
  try {
    await progressAllService(webContents, steamid, cookies);
  } catch (error) {
    const err = sanitizeError(error);
    sendErrorProgress(webContents, err);
  }
};

export { fetchAllController };
