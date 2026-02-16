import { fileURLToPath } from "node:url";
import path from "node:path";
import { app } from "electron";
import { getPortablePath, isPortable } from "./portable";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");
process.env.DB_PATH = !isPortable()
  ? path.join(app.getPath("userData"), "database.db")
  : path.join(getPortablePath(), "data", "database.db");
process.env.IMAGE_STORAGE_PATH = !isPortable()
  ? path.join(app.getPath("userData"), "images")
  : path.join(getPortablePath(), "data", "images");

process.env.MIGRATION_PATH = process.env.VITE_DEV_SERVER_URL
  ? path.join(__dirname, "../electron/core/db//migrations")
  : path.join(__dirname, "migrations");

const PRELOAD_PATH = path.join(__dirname, "preload.mjs");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

export { VITE_DEV_SERVER_URL, MAIN_DIST, RENDERER_DIST, PRELOAD_PATH };
