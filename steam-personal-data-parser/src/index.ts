import { writeFileSync } from "fs";
import { getTotalFetches } from "./items-coherence/items-prepare";
import { fetchMarketHistory } from "./fetch/fetches";
import itemsResponse from "./items-coherence/items-coherence";

const main = async () => {
  await getTotalFetches(500);
  const res = await fetchMarketHistory(0, 500);
  const items = itemsResponse(res);

  writeFileSync("./test.json", JSON.stringify(res, null, 2));
  writeFileSync("./test-fix.json", JSON.stringify(items, null, 2));
};

main();
