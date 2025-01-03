import { convertToCustomError } from "../error-converter";
import { fetchMarketHistory } from "../fetch/fetches";

const getTotalFetches = async (fetchSize: number, startFetch = 0) => {
  try {
    const res = await fetchMarketHistory(0, 1);
    const totalItems = Math.ceil((res.total_count - startFetch) / fetchSize);
    console.log(`-----==Total fetches ${totalItems} ==-----`);
    if (res.total_count === 0)
      throw new Error("Cookies expired or there is no data to fetch");
    return totalItems;
  } catch (err) {
    const error = convertToCustomError(err);
    console.log(
      `-----==FETCHING ERROR, Can't fetch amount, ${error.message}, ${error.getStatus}==-----`
    );
    process.exit(0);
  }
};

export { getTotalFetches };
