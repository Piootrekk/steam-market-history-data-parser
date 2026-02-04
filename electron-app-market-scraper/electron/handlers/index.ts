import { ipcMainAdapter } from "../ipc-adapter/ipc.main.adapter";
import { fetchAllController } from "./fetch-all/fetch-all.controller";
import { fetchSyncController } from "./fetch-sync/fetch-sync.controller";
import { listingsCountController } from "./listings-count/listings-count.controller";
import { listingsController } from "./listings/listings.controller";
import { userAllController } from "./user-all/user-all.controller";

const registerAllHandlers = () => {
  ipcMainAdapter.handle("db:users:all", userAllController);
  ipcMainAdapter.handle("fetch:all:start", fetchAllController);
  ipcMainAdapter.handle("fetch:sync:start", fetchSyncController);
  ipcMainAdapter.handle("db:user:listings", listingsController);
  ipcMainAdapter.handle("db:user:listings:count", listingsCountController);
};

export { registerAllHandlers };
