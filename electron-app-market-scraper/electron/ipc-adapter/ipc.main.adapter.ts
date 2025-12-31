import { BrowserWindow, ipcMain, type WebContents } from "electron";
import type {
  Channel,
  HandlerArgs,
  HandlerFn,
  HandlerFnWithEvent,
} from "./ipc.payload";

const ipcMainAdapter = {
  send<K extends Channel>(
    window: BrowserWindow,
    channel: K,
    ...args: HandlerArgs<K>
  ): void {
    window.webContents.send(channel, ...args);
  },

  handle<K extends Channel>(channel: K, callback: HandlerFnWithEvent<K>): void {
    ipcMain.handle(channel, (event, ...args: HandlerArgs<K>) => {
      return callback(event, ...args);
    });
  },

  on<K extends Channel>(channel: K, callback: HandlerFn<K>): void {
    ipcMain.on(channel, (_event, ...args: HandlerArgs<K>) => {
      callback(...args);
    });
  },
};

const ipcWebContentsAdapter = {
  send<K extends Channel>(
    wc: WebContents,
    channel: K,
    ...args: HandlerArgs<K>
  ): void {
    wc.send(channel, ...args);
  },
};

export { ipcMainAdapter, ipcWebContentsAdapter };
