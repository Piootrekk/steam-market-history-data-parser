import CustomError from "../../../../../config/error-converter";
import { fetchMarketHistory } from "../fetch/fetches";

const getTotalFetches = async (fetchSize: number, startFetch = 0) => {
  try {
    const res = await fetchMarketHistory(0, 1);
    const totalFetches = Math.ceil((res.total_count - startFetch) / fetchSize);
    console.log(`-----==Total fetches ${totalFetches} ==-----`);
    if (res.total_count === 0)
      throw new Error("Cookies expired or there is no data to fetch");
    return { totalFetches, totalCount: res.total_count };
  } catch (err) {
    const error = new CustomError(err);
    console.log(
      `-----==FETCHING ERROR, Can't fetch amount, ${error.message}, ${error.getStatus}==-----`
    );
    process.exit(0);
  }
};

export { getTotalFetches };
