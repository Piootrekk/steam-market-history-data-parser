import { ipcRenderer } from "electron";
import type { AppEventHandlers } from "./ipc.payload";

const ipcRendererAdapter = {
  once<K extends keyof AppEventHandlers>(
    channel: K,
    callback: AppEventHandlers[K]
  ) {
    ipcRenderer.once(
      channel,
      (_event, ...args: Parameters<AppEventHandlers[K]>) => {
        callback(...args);
      }
    );
  },
  invoke<K extends keyof AppEventHandlers>(
    channel: K,
    ...args: Parameters<AppEventHandlers[K]>
  ) {
    return ipcRenderer.invoke(channel, ...args);
  },
  send<K extends keyof AppEventHandlers>(
    channel: K,
    ...args: Parameters<AppEventHandlers[K]>
  ) {
    ipcRenderer.send(channel, ...args);
  },
  on<K extends keyof AppEventHandlers>(
    channel: K,
    callback: AppEventHandlers[K]
  ) {
    ipcRenderer.on(channel, (_event, ...args) => {
      callback(...args);
    });
  },
};

export { ipcRendererAdapter };
