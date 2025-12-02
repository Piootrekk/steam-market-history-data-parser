import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  schema: "./electron/core/db/schema.ts",
  out: "./electron/core/db/migrations",
  dbCredentials: {
    url: process.env.DB_PATH,
  },
} satisfies Config;
