import { contextBridge } from "electron";
import { ipcRendererAdapter } from "./ipc-adapter/ipc.preload.adapter";

contextBridge.exposeInMainWorld("electronAPI", {
  setupCheck: (callback) =>
    ipcRendererAdapter.once("init-setup-check", callback),
  getAllUsers: () => ipcRendererAdapter.invoke("db:getAllUsers"),
} satisfies Window["electronAPI"]);
