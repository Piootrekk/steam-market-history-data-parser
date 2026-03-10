import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { electronPlugin } from "./vite.electron.config";
import { staticCopyPlugin } from "./vite.static-copy.config";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    electronPlugin(),
    tailwindcss(),
    staticCopyPlugin(),
  ],
});
