import { sanitizeError } from "@electron/error";
import { getProgressEmitter } from "./fetch-sync.emits";
import { fetchSyncService } from "./fetch-sync.service";

const fetchSyncController = async (
  event: Electron.IpcMainInvokeEvent,
  accountId: number,
  cookies: string,
) => {
  const webContents = event.sender;
  const progressEmitter = getProgressEmitter(webContents);
  try {
    await fetchSyncService(progressEmitter, accountId, cookies);
  } catch (error) {
    const err = sanitizeError(error);
    progressEmitter.sendErrorProgress(err);
  }
};

export { fetchSyncController };
