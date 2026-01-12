import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient, type Client } from "@libsql/client";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle>;

const getClientInit = (userDataPath: string): Client => {
  if (!userDataPath) {
    throw new Error("initDatabase requires a valid filesystem path");
  }
  return createClient({
    url: `file:${userDataPath}`,
  });
};

const getDatabaseInit = (client: Client): Db => {
  const db = drizzle(client, { schema });
  return db;
};

const runMigrate = async (migrationsFolderPath: string, db: Db) => {
  if (db === null) throw new Error("Db not defined, initialize it first");
  await migrate(db, { migrationsFolder: migrationsFolderPath });
};

const closeDbConnection = (client: Client) => {
  if (!client) {
    throw new Error("Connection already closed");
  }
  client.close();
};

export { getDatabaseInit, closeDbConnection, runMigrate, getClientInit };
export type { Db, Client };
