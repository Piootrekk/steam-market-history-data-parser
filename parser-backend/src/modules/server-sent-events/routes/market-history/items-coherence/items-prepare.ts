import { fetchMarketHistory } from "../fetch/fetches";

const getTotalFetchesAndCount = async (fetchSize: number, startFetch = 0) => {
  const res = await fetchMarketHistory(0, 1);
  const totalFetches = Math.ceil((res.total_count - startFetch) / fetchSize);
  if (res.total_count === 0)
    throw new Error("Cookies expired or there is no data to fetch");
  return { totalFetches, totalCount: res.total_count };
};

const getTotalCount = async (): Promise<number> => {
  const res = await fetchMarketHistory(0, 1);
  if (res.total_count === 0)
    throw new Error("Cookies expired or there is no data to fetch");
  return res.total_count;
};

const getChunksAndChange = async (
  fetchChunkLimit: number,
  totalCount: number
) => {
  const chunks = Math.floor(totalCount / fetchChunkLimit);
  const change = totalCount - fetchChunkLimit * chunks;
  return { chunks, change };
};

export { getTotalFetchesAndCount, getTotalCount, getChunksAndChange };
