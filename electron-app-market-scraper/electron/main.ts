import path from "node:path";
import { app, BrowserWindow } from "electron";
import { initDatabase } from "./core/db";
import { PRELOAD_PATH, RENDERER_DIST, VITE_DEV_SERVER_URL } from "./env";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    minWidth: 400,
    minHeight: 400,
    autoHideMenuBar: true,
    webPreferences: {
      preload: PRELOAD_PATH,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });
  setupRenderer(mainWindow);

  mainWindow.webContents.on("did-finish-load", () => {
    initConnectionCheck(mainWindow);
  });
};

const setupRenderer = (mainWindow: BrowserWindow) => {
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
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

const initConnectionCheck = (window: BrowserWindow) => {
  window.webContents.send("init-setup-check", "Connection success");
};

app.whenReady().then(async () => {
  try {
    const dbPath = path.join(app.getPath("userData"), "database.db");
    console.log("PATH", dbPath);

    await initDatabase(dbPath);

    createWindow();
  } catch (err) {
    console.error("DB error or startup error:", err);
    app.quit();
  }
});
