import type { Assets, CurrentAsset } from "../fetch/raw-fetch-response.types";

const getAllCurrentAssets = (assets: Assets) => {
  const games = getCurrentGamesFromAssets(assets);
  const assetRecords = games.reduce<Record<string, CurrentAsset>>(
    (acc, game) => {
      const currentversion = getFirstVersion(assets[game]);
      const records = assets[game][currentversion];
      return { ...acc, ...records };
    },
    {},
  );
  return assetRecords;
};

const getCurrentGamesFromAssets = (assets: Assets): string[] => {
  const games = Object.keys(assets) as string[];
  return games;
};

const getFirstVersion = (assetGame: Record<string, unknown>) => {
  const versions = Object.keys(assetGame);
  return versions[0] as string;
};

export { getAllCurrentAssets };
