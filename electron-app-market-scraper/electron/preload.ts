import { contextBridge } from "electron";
import { ipcRendererAdapter } from "./ipc-adapter/ipc.preload.adapter";

contextBridge.exposeInMainWorld("electronAPI", {
  setupCheck: (callback) =>
    ipcRendererAdapter.once("init:setup-check", callback),

  getAllUsers: () => ipcRendererAdapter.invoke("db:users:all"),

  getCountListingsFromSteamId: (steamId) =>
    ipcRendererAdapter.invoke("db:user:listings:count", steamId),

  getListingsFromSteamId: (steamId, start, limit, query) =>
    ipcRendererAdapter.invoke("db:user:listings", steamId, start, limit, query),

  startFetchingAll: (steamId, cookies) =>
    ipcRendererAdapter.invoke("fetch:all:start", steamId, cookies),

  startFetchingSync: (steamId, cookies) =>
    ipcRendererAdapter.invoke("fetch:sync:start", steamId, cookies),

  progressFetching: (callback) =>
    ipcRendererAdapter.on("fetch:progress", callback),
} satisfies Window["electronAPI"]);
