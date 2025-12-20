import {
  closeDbConnection,
  getClientInit,
  getDatabaseInit,
  runMigrate,
  type Client,
  type Db,
} from "./core/db";

let client: Client | null = null;
let db: Db | null = null;

const connectDb = () => {
  client = getClientInit(process.env.DB_PATH);
  db = getDatabaseInit(client);
  runMigrate(process.env.MIGRATION_PATH, db);
};

const closeDb = () => {
  if (!client) throw new Error("Client connection not exits");
  closeDbConnection(client);
  client = null;
  db = null;
};

const getDbInstance = () => {
  if (db) return db;
  else throw new Error("Db not exist, connect/init first");
};

export { connectDb, closeDb, getDbInstance };
