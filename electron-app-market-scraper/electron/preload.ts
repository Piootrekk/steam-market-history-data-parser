import { contextBridge, ipcRenderer, type IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  connectionCheck: (callback: (value: string) => void) => {
    ipcRenderer.on(
      "connection-test",
      (_event: IpcRendererEvent, value: string) => {
        callback(value);
      }
    );
  },
} satisfies Window["electronAPI"]);
