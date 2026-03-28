import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { electronPlugin } from "./vite.electron.config";
import { staticCopyPlugin } from "./vite.static-copy.config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [react(), electronPlugin(), tailwindcss(), staticCopyPlugin()],
});
