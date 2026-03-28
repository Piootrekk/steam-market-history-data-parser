import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const staticCopyPlugin = (): Plugin => ({
  name: "copy-migrations",
  closeBundle: () => {
    const src = path.resolve(__dirname, "electron/core/db/migrations");
    const dest = path.resolve(__dirname, "dist-electron/migrations");
    fs.cpSync(src, dest, { recursive: true });
    console.log("✓ Migrations copied to dist-electron/migrations");
  },
});

export { staticCopyPlugin };
