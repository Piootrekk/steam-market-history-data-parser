import { BrowserWindow, ipcMain, type WebContents } from "electron";
import type {
  ChannelValue,
  HandlerArgs,
  HandlerFn,
  HandlerFnWithEvent,
} from "./ipc.types";

const ipcMainAdapter = {
  send<K extends ChannelValue>(
    window: BrowserWindow,
    channel: K,
    ...args: HandlerArgs<K>
  ): void {
    window.webContents.send(channel, ...args);
  },

  handle<K extends ChannelValue>(
    channel: K,
    callback: HandlerFnWithEvent<K>
  ): void {
    ipcMain.handle(channel, (event, ...args: HandlerArgs<K>) => {
      return callback(event, ...args);
    });
  },

  on<K extends ChannelValue>(channel: K, callback: HandlerFn<K>): void {
    ipcMain.on(channel, (_event, ...args: HandlerArgs<K>) => {
      callback(...args);
    });
  },
};

const ipcWebContentsAdapter = {
  send<K extends ChannelValue>(
    wc: WebContents,
    channel: K,
    ...args: HandlerArgs<K>
  ): void {
    wc.send(channel, ...args);
  },
};

export { ipcMainAdapter, ipcWebContentsAdapter };
