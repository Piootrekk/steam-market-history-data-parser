import os from "os";
import path from "path";

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
      throw new Error("Invalid config of appdata path");
  }
};

const getDbPath = () => {
  const appdataPath = getAppdataPath();
  const dbPath = path.join(
    appdataPath,
    "electron-app-market-history-scraper",
    "database.db"
  );
  console.log("PATH: ", dbPath);
  return dbPath;
};

export { getAppdataPath, getDbPath };
