import { app } from "electron";
import fs from "fs";
import path from "path";

//TODO add linux mac support in the future

const isPortable = () => {
  if (!app.isPackaged) {
    return false;
  }

  if (process.env.PORTABLE_EXECUTABLE_DIR) {
    return true;
  }

  return false;
};

const getPortablePath = () => {
  if (process.env.PORTABLE_EXECUTABLE_DIR) {
    return process.env.PORTABLE_EXECUTABLE_DIR;
  } else throw new Error("Portable not supported yet.");
};

const ensureDirExists = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

const getOperationalPath = () => {
  if (!isPortable) throw new Error("Invalid config for not portable build.");
  const operationalFolderName = "data";
  const portablePath = getPortablePath();
  const operationalPath = path.join(portablePath, operationalFolderName);
  ensureDirExists(operationalPath);
  return operationalPath;
};

export { isPortable, getPortablePath, ensureDirExists, getOperationalPath };
