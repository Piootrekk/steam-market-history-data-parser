import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { electronPlugin } from "./vite.electron.config";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), electronPlugin(), tailwindcss()],
});
