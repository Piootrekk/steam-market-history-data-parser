import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

let sqlite: Database.Database | null = null;
let db: ReturnType<typeof drizzle> | null = null;

const initDatabase = (userDataPath: string) => {
  if (!userDataPath || typeof userDataPath !== "string") {
    throw new Error("initDatabase requires a valid filesystem path");
  }
  sqlite = new Database(userDataPath);
  sqlite.pragma("journal_mode = WAL");
  db = drizzle(sqlite, { schema });
};

const runMigrate = (migrationsFolderPath: string) => {
  if (db === null) throw new Error("Db not defined, initialize it first");
  migrate(db, { migrationsFolder: migrationsFolderPath });
};

const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized. Call initDatabase first.");
  }
  return db;
};

const closeDbConnection = () => {
  if (sqlite) {
    sqlite.close();
    db = null;
    sqlite = null;
    console.log("Database connection closed");
  }
};

export { getDb, initDatabase, closeDbConnection, runMigrate };
