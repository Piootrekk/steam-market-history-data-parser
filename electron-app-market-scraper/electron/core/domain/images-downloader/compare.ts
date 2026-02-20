import fs from "fs/promises";

const getListIconIdFromDir = async (pathDir: string) => {
  const files = await fs.readdir(pathDir);
  return files.map((el) => removeLastExtension(el));
};

const removeLastExtension = (filename: string): string => {
  return filename.replace(/\.[^.]+$/, "");
};

const getNewIconIds = (selectedIconIds: string[], dirIconIds: string[]) => {
  const dirIconsSet = new Set(dirIconIds);
  const results = selectedIconIds.filter((iconId) => !dirIconsSet.has(iconId));
  return results;
};

export { getListIconIdFromDir, getNewIconIds, removeLastExtension };
