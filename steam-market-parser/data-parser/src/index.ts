import { writeFileSync } from "fs";
import fetchQueue from "./items-coherence/fetch-queue";

const main = async () => {
  const allHistoryMarketData = await fetchQueue(6000, 500);
  writeFileSync(
    `market-history-main-${new Date().toLocaleDateString()}.json`,
    JSON.stringify(allHistoryMarketData, null, 2)
  );
};

main();
