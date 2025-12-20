import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

type Db = ReturnType<typeof drizzle>;
type Client = Database.Database;

const getClientInit = (userDataPath: string): Client => {
  if (!userDataPath) {
    throw new Error("initDatabase requires a valid filesystem path");
  }
  const sqliteClient = new Database(userDataPath);
  sqliteClient.pragma("foreign_keys = ON");
  sqliteClient.pragma("journal_mode = WAL");
  return sqliteClient;
};

const getDatabaseInit = (client: Client): Db => {
  const db = drizzle(client, { schema });
  return db;
};

const runMigrate = (migrationsFolderPath: string, db: Db) => {
  if (db === null) throw new Error("Db not defined, initialize it first");
  migrate(db, { migrationsFolder: migrationsFolderPath });
};

const closeDbConnection = (client: Client) => {
  if (client) {
    client.close();
    console.log("Database connection closed");
  } else throw new Error("Connection already closed");
};

export { getDatabaseInit, closeDbConnection, runMigrate, getClientInit };
export type { Db, Client };
