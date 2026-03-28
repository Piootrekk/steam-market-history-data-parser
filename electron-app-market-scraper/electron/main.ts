import path from "node:path";
import { app, BrowserWindow, Menu, shell } from "electron";
import { connectDb } from "./db.config";
import { ensureDirExists } from "./dir-setup";
import {
  IMAGE_STORAGE_PATH,
  PRELOAD_PATH,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL,
} from "./env";
import { registerAllHandlers } from "./handlers";
import { ipcMainAdapter } from "./ipc-adapter/ipc.main.adapter";
import { logPortable } from "./portable";
import { registerAllProtocols } from "./protocols";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1125,
    height: 670,
    minWidth: 600,
    minHeight: 400,
    autoHideMenuBar: true,
    webPreferences: {
      preload: PRELOAD_PATH,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  setupRenderer(mainWindow);
  setupExternalWindowOpenHanlder(mainWindow);

  mainWindow.webContents.on("did-finish-load", () => {
    initConnectionCheck(mainWindow);
  });
};

const setupRenderer = (mainWindow: BrowserWindow) => {
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    Menu.setApplicationMenu(null);
    mainWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
};

const setupExternalWindowOpenHanlder = (mainWindow: BrowserWindow) => {
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(async () => {
  try {
    await ensureDirExists(IMAGE_STORAGE_PATH);
    await connectDb();
    registerAllProtocols();
    registerAllHandlers();
    createWindow();
  } catch (err) {
    logPortable("Uncaught exception:", err);
    console.error("App launching error: ", err);
    app.quit();
  }
});

process.on("uncaughtException", (err) => {
  logPortable("Uncaught exception:", err);
  console.error("Uncaught exception:", err);
});

process.on("unhandledRejection", (reason) => {
  logPortable("Uncaught exception:", reason);
  console.error("Unhandled rejection:", reason);
});

const initConnectionCheck = (window: BrowserWindow) => {
  ipcMainAdapter.send(window, "init:setup-check", "Connection success");
};
