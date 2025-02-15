import { paths } from "./types/api.types";

import axiosInstance from "./instanceAxios";

type TMarketHistoryName =
  paths["/market/collections-market"]["get"]["responses"]["200"]["content"]["application/json"];

const getMarketHistoryCollectionsName = async (): Promise<string[]> => {
  const names = await axiosInstance.get<TMarketHistoryName>(
    "/market/collections-market"
  );
  if (!names.data) throw new Error("No data found");
  return names.data.collections;
};

type TDocuments =
  paths["/market/documents"]["get"]["responses"]["200"]["content"]["application/json"];

const getDocument = async (
  collectionName: string,
  skip?: number,
  limit?: number,
  search?: string
): Promise<TDocuments> => {
  const params = new URLSearchParams({
    collectionName: collectionName,
  });

  if (skip !== undefined) params.append("skip", skip.toString());
  if (limit !== undefined) params.append("limit", limit.toString());
  if (search !== undefined) params.append("search", search);
  const docs = await axiosInstance.get<TDocuments>(
    `/market/documents?${params.toString()}`
  );
  if (!docs.data) throw new Error("No data found");
  return docs.data;
};

export { getMarketHistoryCollectionsName, getDocument };
export type { TDocuments, TMarketHistoryName };
