import path from "node:path";
import { app } from "electron";

//TODO add linux mac portable support in the future

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

const getOperationalPath = () => {
  if (!isPortable) throw new Error("Invalid config for not portable build.");
  const operationalFolderName = "data";
  const portablePath = getPortablePath();
  const operationalPath = path.join(portablePath, operationalFolderName);
  return operationalPath;
};

export { isPortable, getPortablePath, getOperationalPath };
