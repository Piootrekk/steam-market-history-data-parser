import os from "node:os";
import path from "node:path";
import pkg from "../../../package.json";

const getAppdataPath = () => {
  const home = os.homedir();
  switch (process.platform) {
    case "win32":
      return path.join(home, "AppData", "Roaming");
    case "darwin":
      return path.join(home, "Library", "Application Support");
    case "linux":
      return path.join(home, ".config");
    default:
      throw new Error(
        "Invalid config of appdata path or system not supported.",
      );
  }
};

const getDbPath = () => {
  const appdataPath = getAppdataPath();
  const dbPath = path.join(appdataPath, pkg.name, "database.db");
  return dbPath;
};

export { getAppdataPath, getDbPath };
