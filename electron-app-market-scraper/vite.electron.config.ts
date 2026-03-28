import path from "node:path";
import type { PluginOption } from "vite";
import electron from "vite-plugin-electron/simple";

const electronPlugin = () =>
  electron({
    main: {
      entry: "electron/main.ts",
      vite: {
        resolve: {
          tsconfigPaths: true,
        },
        build: {
          minify: "oxc",
          rolldownOptions: {
            output: {
              codeSplitting: false,
            },
            external: ["@libsql/client", "drizzle-orm-sqlite", "drizzle-orm"],
          },
        },
      },
    },
    preload: {
      input: path.join(__dirname, "electron/preload.ts"),
      vite: {
        build: {
          minify: "oxc",
        },
      },
    },
  }) satisfies PluginOption;

export { electronPlugin };
