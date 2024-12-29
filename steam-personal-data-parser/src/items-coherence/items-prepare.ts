import { fetchMarketHistory } from "../fetch/fetches";

const getTotalFetches = async (fetchSize: number) => {
  try {
    const res = await fetchMarketHistory(0, 1);
    const totalItems = Math.ceil(res.total_count / fetchSize);
    console.log(`-----==Total fetches ${totalItems} ==-----`);

    return totalItems;
  } catch (err) {
    console.log("-----==FETCHING ERROR, Can't fetch amount==-----");
    process.exit(0);
  }
};

export { getTotalFetches };
