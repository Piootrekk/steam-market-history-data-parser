import { fetchMarketHistory } from "./fetch/fetches";

const main = async () => {
  await fetchMarketHistory(0, 1);
};

main();
