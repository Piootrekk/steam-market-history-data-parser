import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle> | null = null;
let sqlite: Database.Database | null = null;

const initDatabase = async (userDataPath: string) => {
  if (!userDataPath || typeof userDataPath !== "string") {
    throw new Error("initDatabase requires a valid filesystem path");
  }
  sqlite = new Database(userDataPath);
  sqlite.pragma("journal_mode = WAL");
  db = drizzle(sqlite, { schema });
  console.log("DB CREATED at", userDataPath);
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

export { getDb, initDatabase, closeDbConnection };
