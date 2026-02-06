import { PluginOption } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const staticCopyPlugin = () =>
  viteStaticCopy({
    targets: [
      {
        src: "./electron/core/db/migrations",
        dest: "../dist-electron",
      },
    ],
  }) satisfies PluginOption;

export { staticCopyPlugin };
