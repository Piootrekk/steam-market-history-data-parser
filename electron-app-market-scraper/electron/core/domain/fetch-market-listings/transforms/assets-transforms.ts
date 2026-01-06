import type { Assets, CurrentAsset } from "../raw-fetch-response.types";

const getAllCurrentAssets = (assets: Assets) => {
  const games = getCurrentGamesFromAssets(assets);
  const assetRecords = games.reduce<Record<string, CurrentAsset>>(
    (acc, game) => {
      const currentversion = getFirstVersion(assets[game]);
      const records = assets[game][currentversion];
      return { ...acc, ...records };
    },
    {}
  );
  return assetRecords;
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
