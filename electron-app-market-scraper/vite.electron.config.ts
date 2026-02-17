import path from "node:path";
import type { PluginOption } from "vite";
import electron from "vite-plugin-electron/simple";
import tsconfigPaths from "vite-tsconfig-paths";

const electronPlugin = () =>
  electron({
    main: {
      entry: "electron/main.ts",
      vite: {
        plugins: [tsconfigPaths()],
        build: {
          rollupOptions: {
            external: ["@libsql/client", "drizzle-orm-sqlite", "drizzle-orm"],
          },
        },
      },
    },
    preload: {
      input: path.join(__dirname, "electron/preload.ts"),
    },
  }) satisfies PluginOption;

export { electronPlugin };
