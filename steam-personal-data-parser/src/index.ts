import { writeFileSync } from "fs";
import { getTotalFetches } from "./items-coherence/items-prepare";
import { fetchMarketHistory } from "./fetch/fetches";
import { fixEvents, getGamesProps } from "./items-coherence/items-coherence";
import TMarketHistoryResponse from "./fetch/fetch.types";

const main = async () => {
  await getTotalFetches(500);
  const res = await fetchMarketHistory(0, 10);
  const fixedRes = fixEvents(res);

  writeFileSync("./test.json", JSON.stringify(res, null, 2));
  writeFileSync("./test.json", JSON.stringify(fixedRes, null, 2));
};

main();
