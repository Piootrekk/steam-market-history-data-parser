import { listingsAllService, listingsService } from "./listings.service";

const listingsController = async (
  _event: Electron.IpcMainInvokeEvent,
  steamId: string,
  start: number,
  limit: number,
  query?: string,
) => {
  return await listingsService(steamId, start, limit, query);
};

const listingsAllController = async (
  _event: Electron.IpcMainInvokeEvent,
  start: number,
  limit: number,
  query?: string,
) => {
  return await listingsAllService(start, limit, query);
};

export { listingsController, listingsAllController };
