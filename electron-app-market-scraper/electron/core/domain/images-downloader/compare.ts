import fs from "fs/promises";

const getListIconIdFromDir = async (pathDir: string) => {
  const files = await fs.readdir(pathDir);
  return files.map((el) => removeLastExtension(el));
};

const removeLastExtension = (filename: string): string => {
  return filename.replace(/\.[^.]+$/, "");
};

const getNewIconIds = (
  dbIconsIds: { urlIcon: string; iconHashStorage: string }[],
  dirIconIds: string[],
) => {
  const dirIconsSet = new Set(dirIconIds);
  const results = dbIconsIds.filter(
    ({ iconHashStorage }) => !dirIconsSet.has(iconHashStorage),
  );
  return results;
};

export { getNewIconIds, removeLastExtension, getListIconIdFromDir };
