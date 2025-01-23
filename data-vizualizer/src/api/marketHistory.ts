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
  const response = await axiosInstance.post<
    paths["/market/all"]["post"]["responses"]["200"]["content"]["application/json"]
  >("/market/all", {
    steamid,
    cookies,
  });
  if (!response.data) throw new Error("No data found");
  if (response.data.success === undefined) throw new Error("No success found");
  return response.data.success;
};

export { getMarketHistoryCollectionsName, getAllMarketHistory };
