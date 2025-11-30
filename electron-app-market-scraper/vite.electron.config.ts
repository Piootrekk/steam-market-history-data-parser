import path from "node:path";
import type { PluginOption } from "vite";
import electron from "vite-plugin-electron/simple";

const electronPlugin = () =>
  electron({
    main: {
      entry: "electron/main.ts",
      vite: {
        build: {
          rollupOptions: {
            external: [
              "better-sqlite3",
              "drizzle-orm-sqlite",
              "drizzle-orm-sqlite/better-sqlite3",
              "drizzle-orm",
            ],
          },
        },
      },
    },
    preload: {
      input: path.join(__dirname, "electron/preload.ts"),
    },
  }) satisfies PluginOption;

export { electronPlugin };
