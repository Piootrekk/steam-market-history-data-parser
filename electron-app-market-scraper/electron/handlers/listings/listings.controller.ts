import { listingsService } from "./listings.service";

const listingsController = async (
  _event: Electron.IpcMainInvokeEvent,
  steamId: string,
  start: number,
  limit: number
) => {
  return await listingsService(steamId, start, limit);
};

export { listingsController };
