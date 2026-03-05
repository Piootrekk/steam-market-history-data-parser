import fs from "fs";

const ensureDirExists = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

export { ensureDirExists };
