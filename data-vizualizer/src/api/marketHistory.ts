import { paths } from "./types/api.types";

import axiosInstance from "./instanceAxios";

const getMarketHistoryCollectionsName = async (): Promise<string[]> => {
  const names = await axiosInstance.get<
    paths["/market/collections-market"]["get"]["responses"]["200"]["content"]["application/json"]
  >("/market/collections-market");
  if (!names.data) throw new Error("No data found");
  return names.data.collections;
};

const getAllMarketHistory = async (steamid: string, cookies: string) => {
  console.log(steamid, cookies);
};

export { getMarketHistoryCollectionsName, getAllMarketHistory };
