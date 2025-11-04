import type { Assets, CurrentAsset } from "../raw-fetch-response.types";

const getAllCurrentAssets = (assets: Assets): CurrentAsset[] => {
  const games = getCurrentGamesFromAssets(assets);
  const currentAsset = games.map((game) => {
    const currentversion = getFirstVersion(assets[game]);
    const currentAssetRecords = assets[game][currentversion];
    const currentAsset = Object.values(currentAssetRecords);
    return currentAsset;
  });
  return currentAsset.flat();
};

const getCurrentGamesFromAssets = (assets: Assets): `${number}`[] => {
  const games = Object.keys(assets) as `${number}`[];
  return games;
};

const getFirstVersion = (assetGame: Record<string, unknown>) => {
  const versions = Object.keys(assetGame);
  return versions[0] as `${number}`;
};

export { getAllCurrentAssets };
