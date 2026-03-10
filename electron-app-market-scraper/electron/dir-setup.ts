import fs from "node:fs";

const ensureDirExists = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

export { ensureDirExists };
