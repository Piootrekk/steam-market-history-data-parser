import { app } from "electron";

//TODO add linux mac support in the future

const isPortable = () => {
  console.log(process.env.PORTABLE_EXECUTABLE_DIR);
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
    console.log(process.env.PORTABLE_EXECUTABLE_DIR);
    return process.env.PORTABLE_EXECUTABLE_DIR;
  } else throw new Error("Portable not supported yet.");
};

export { isPortable, getPortablePath };
