import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { electronPlugin } from "./electron.config";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), electronPlugin()],
});
