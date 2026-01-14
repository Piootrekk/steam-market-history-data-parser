import { ListingsService } from "./listings.service";

const listingsController = async (
  _event: Electron.IpcMainInvokeEvent,
  steamId: string,
  start: number,
  limit: number
) => {
  return await ListingsService(steamId, start, limit);
};

export { listingsController };
