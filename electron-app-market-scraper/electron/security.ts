import type { WebFrameMain } from "electron";
import { RENDERER_DIST, VITE_DEV_SERVER_URL } from "./env";
import { pathToFileURL } from "node:url";
import path from "node:path";

const validateEventFrame = (frame: WebFrameMain) => {
  if (VITE_DEV_SERVER_URL && frame.url === VITE_DEV_SERVER_URL) return;
  else if (
    frame.url !==
    pathToFileURL(path.join(RENDERER_DIST, "index.html")).toString()
  )
    throw new Error("Malicious activity ");
};

export { validateEventFrame };
