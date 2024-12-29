import { writeFileSync } from "fs";
import { getTotalFetches } from "./items-coherence/items-prepare";
import { fetchMarketHistory } from "./fetch/fetches";
import { getGamesProps } from "./items-coherence/items-coherence";

const main = async () => {
  await getTotalFetches(500);
  const res = await fetchMarketHistory(0, 1);
  const games = getGamesProps(res);

  writeFileSync("./test.json", JSON.stringify(res, null, 2));
};

main();
