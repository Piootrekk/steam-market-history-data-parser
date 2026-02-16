import type { Config } from "drizzle-kit";
import { getDbPath } from "./db-path-resolver";

export default {
  dialect: "sqlite",
  schema: "./electron/core/db/schema.ts",
  out: "./electron/core/db/migrations",
  dbCredentials: {
    url: `file:${getDbPath()}`,
  },
} satisfies Config;
