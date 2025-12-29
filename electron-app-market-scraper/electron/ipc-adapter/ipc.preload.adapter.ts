import { ipcRenderer } from "electron";
import type {
  HandlerFn,
  HandlerArgs,
  HandlerResponse,
  Channel,
} from "./ipc.payload";

const ipcRendererAdapter = {
  once<K extends Channel>(channel: K, callback: HandlerFn<K>): void {
    ipcRenderer.once(channel, (_event, ...args: HandlerArgs<K>) => {
      callback(...args);
    });
  },

  invoke<K extends Channel>(
    channel: K,
    ...args: HandlerArgs<K>
  ): HandlerResponse<K> {
    return ipcRenderer.invoke(channel, ...args);
  },

  send<K extends Channel>(channel: K, ...args: HandlerArgs<K>): void {
    ipcRenderer.send(channel, ...args);
  },

  on<K extends Channel>(channel: K, callback: HandlerFn<K>): void {
    ipcRenderer.on(channel, (_event, ...args: HandlerArgs<K>) => {
      callback(...args);
    });
  },
};

export { ipcRendererAdapter };
