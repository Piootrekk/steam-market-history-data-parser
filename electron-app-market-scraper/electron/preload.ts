import { contextBridge } from "electron";
import { ipcRendererAdapter } from "./ipc-adapter/ipc.preload.adapter";

contextBridge.exposeInMainWorld("electronAPI", {
  setupCheck: (callback) =>
    ipcRendererAdapter.once("init:setup-check", callback),

  getAllUsers: () => ipcRendererAdapter.invoke("db:users:all"),

  getCountListingsFromSteamId: (steamId, query) =>
    ipcRendererAdapter.invoke("db:user:listings:count", steamId, query),
  getListingsFromSteamId: (steamId, start, limit, query) =>
    ipcRendererAdapter.invoke("db:user:listings", steamId, start, limit, query),

  startFetchingAll: (steamId, cookies) =>
    ipcRendererAdapter.invoke("fetch:all:start", steamId, cookies),
  startFetchingSync: (steamId, cookies) =>
    ipcRendererAdapter.invoke("fetch:sync:start", steamId, cookies),
  progressFetching: (callback) =>
    ipcRendererAdapter.on("fetch:progress", callback),

  getCountAllListings: (query) =>
    ipcRendererAdapter.invoke("db:all:listings:count", query),
  getListingsAll: (start, limit, query) =>
    ipcRendererAdapter.invoke("db:all:listings", start, limit, query),
} satisfies Window["electronAPI"]);
