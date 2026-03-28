import { mkdir } from "node:fs/promises";

const ensureDirExists = async (path: string): Promise<void> => {
  await mkdir(path, { recursive: true });
};

export { ensureDirExists };
