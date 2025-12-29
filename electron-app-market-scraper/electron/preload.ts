import { contextBridge } from "electron";
import { ipcRendererAdapter } from "./ipc-adapter/ipc.preload.adapter";

contextBridge.exposeInMainWorld("electronAPI", {
  setupCheck: (callback) =>
    ipcRendererAdapter.once("init:setup-check", callback),
  getAllUsers: () => ipcRendererAdapter.invoke("db:getAllUsers"),
  startFetchingAll: (steamId: string, cookies: string) =>
    ipcRendererAdapter.invoke("fetch:all:start", steamId, cookies),
  progressFetchingAll: (callback) =>
    ipcRendererAdapter.on("fetch:all:progress", callback),
} satisfies Window["electronAPI"]);
