import type { Config } from "drizzle-kit";
import path from "path";

const drizzleConfig = {
  dialect: "sqlite",
  schema: path.resolve(__dirname, "./schema.ts"),
  out: path.resolve(__dirname, "./migrations"),
  dbCredentials: {
    url: path.resolve(__dirname, "./database.db"),
  },
} satisfies Config;

export { drizzleConfig };
