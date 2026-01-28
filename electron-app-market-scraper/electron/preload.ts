import { contextBridge } from "electron";
import { ipcRendererAdapter } from "./ipc-adapter/ipc.preload.adapter";

contextBridge.exposeInMainWorld("electronAPI", {
  setupCheck: (callback) =>
    ipcRendererAdapter.once("init:setup-check", callback),

  getAllUsers: () => ipcRendererAdapter.invoke("db:users:all"),

  getCountListingsFromSteamId: (steamId) =>
    ipcRendererAdapter.invoke("db:user:listings:count", steamId),

  getListingsFromSteamId: (steamId, start, limit) =>
    ipcRendererAdapter.invoke("db:user:listings", steamId, start, limit),

  startFetchingAll: (steamId, cookies) =>
    ipcRendererAdapter.invoke("fetch:all:start", steamId, cookies),

  progressFetchingAll: (callback) =>
    ipcRendererAdapter.on("fetch:all:progress", callback),
} satisfies Window["electronAPI"]);
