import { ipcMainAdapter } from "../ipc-adapter/ipc.main.adapter";
import { getAllUsersHandler } from "./all-users.handler";
import { startFetchingAll } from "./all-fetch.handler";

const registerAllHandlers = () => {
  ipcMainAdapter.handle("db:users:all", getAllUsersHandler);
  ipcMainAdapter.handle("fetch:all:start", startFetchingAll);
};

export { registerAllHandlers };
