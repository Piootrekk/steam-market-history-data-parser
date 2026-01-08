import { ipcRenderer } from "electron";
import type { ChannelValue, HandlerArgs, HandlerFn } from "./ipc.types";

const ipcRendererAdapter = {
  once<K extends ChannelValue>(channel: K, callback: HandlerFn<K>): void {
    ipcRenderer.once(channel, (_event, ...args: HandlerArgs<K>) => {
      callback(...args);
    });
  },

  invoke<K extends ChannelValue>(channel: K, ...args: HandlerArgs<K>) {
    return ipcRenderer.invoke(channel, ...args);
  },

  send<K extends ChannelValue>(channel: K, ...args: HandlerArgs<K>): void {
    ipcRenderer.send(channel, ...args);
  },

  on<K extends ChannelValue>(channel: K, callback: HandlerFn<K>): () => void {
    const listener = (
      _event: Electron.IpcRendererEvent,
      ...args: HandlerArgs<K>
    ) => callback(...args);
    ipcRenderer.on(channel, listener);
    return () => {
      ipcRenderer.removeListener(channel, listener);
    };
  },
};

export { ipcRendererAdapter };
