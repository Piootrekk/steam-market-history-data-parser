import type { Config } from "drizzle-kit";
import { getDbPath } from "./utils";

export default {
  dialect: "sqlite",
  schema: "./electron/core/db/schema.ts",
  out: "./electron/core/db/migrations",
  dbCredentials: {
    url: getDbPath(),
  },
} satisfies Config;
