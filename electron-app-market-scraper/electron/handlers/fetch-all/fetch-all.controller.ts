import { fetchAllService } from "./fetch-all.service";
import { sanitizeError } from "../../error";
import { getProgressEmitter } from "./fetch-all.emits";

const fetchAllController = async (
  event: Electron.IpcMainInvokeEvent,
  steamid: string,
  cookies: string,
) => {
  const webContents = event.sender;
  const progressEmitter = getProgressEmitter(webContents);
  try {
    await fetchAllService(progressEmitter, steamid, cookies);
  } catch (error) {
    const err = sanitizeError(error);
    progressEmitter.sendErrorProgress(err);
  }
};

export { fetchAllController };
