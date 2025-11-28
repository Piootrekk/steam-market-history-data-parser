import { contextBridge, ipcRenderer, type IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  setupCheck: (callback: (value: string) => void) => {
    ipcRenderer.once(
      "init-setup-check",
      (_event: IpcRendererEvent, value: string) => {
        callback(value);
      }
    );
  },
} satisfies Window["electronAPI"]);
