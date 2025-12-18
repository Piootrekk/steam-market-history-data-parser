import { BrowserWindow, ipcMain } from "electron";
import type { AppEventHandlers } from "./ipc.payload";

const ipcMainAdapter = {
  send<K extends keyof AppEventHandlers>(
    window: BrowserWindow,
    channel: K,
    ...args: Parameters<AppEventHandlers[K]>
  ) {
    window.webContents.send(channel, ...args);
  },
  handle<K extends keyof AppEventHandlers>(
    channel: K,
    callback: AppEventHandlers[K]
  ) {
    ipcMain.handle(channel, (_event, ...args) => {
      return callback(...args);
    });
  },
  on<K extends keyof AppEventHandlers>(
    channel: K,
    callback: AppEventHandlers[K]
  ) {
    ipcMain.on(channel, (_event, ...args) => {
      callback(...args);
    });
  },
};

export { ipcMainAdapter };
