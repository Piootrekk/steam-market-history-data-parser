import { fetchAllService } from "./fetch-all.service";
import { sanitizeError } from "../../error";
import { sendErrorProgress } from "../common/send-progress.emit";

const fetchAllController = async (
  event: Electron.IpcMainInvokeEvent,
  steamid: string,
  cookies: string,
) => {
  const webContents = event.sender;
  try {
    await fetchAllService(webContents, steamid, cookies);
  } catch (error) {
    const err = sanitizeError(error);
    sendErrorProgress(webContents, err);
  }
};

export { fetchAllController };
