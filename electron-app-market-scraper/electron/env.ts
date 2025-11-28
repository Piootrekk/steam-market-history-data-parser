import { fileURLToPath } from "node:url";
import path from "node:path";
import { app } from "electron";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");
process.env.DB_PATH = path.join(app.getPath("userData"), "data.db");

const PRELOAD_PATH = path.join(__dirname, "preload.mjs");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

export { VITE_DEV_SERVER_URL, MAIN_DIST, RENDERER_DIST, PRELOAD_PATH };
