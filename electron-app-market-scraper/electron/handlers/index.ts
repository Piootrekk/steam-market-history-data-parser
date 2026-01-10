import { ipcMainAdapter } from "../ipc-adapter/ipc.main.adapter";
import { fetchAllController } from "./fetch-all/fetch-all.controller";
import { userAllController } from "./user-all/user-all.controller";

const registerAllHandlers = () => {
  ipcMainAdapter.handle("db:users:all", userAllController);
  ipcMainAdapter.handle("fetch:all:start", fetchAllController);
};

export { registerAllHandlers };
