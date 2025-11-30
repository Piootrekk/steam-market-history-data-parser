import pkg from "../package.json";

const appName = pkg.name;
const version = pkg.version;
const dbName = "database.db";

export { appName, version, dbName };
