import { Filter } from "mongodb";
import type {
  TMarketActions,
  TMarketGames,
  TMarketHistoryModel,
} from "./market-history.model";

const getQueryForMarketHistory = (
  search?: string,
  actions?: TMarketActions[],
  games?: TMarketGames[]
) => {
  const query: Filter<TMarketHistoryModel> = {};
  if (search !== undefined) {
    query.market_hash_name = {
      $regex: search,
      $options: "i",
    };
  }

  if (actions !== undefined) {
    query.event_action = { $in: actions };
  }

  if (games !== undefined) {
    const baseGames: number[] = [252490, 440, 730];
    const isOthersSelected = games.includes("others");
    const selectedGames = games.filter((game) => game !== "others").map(Number);

    const notSelectedInBaseGames = baseGames.filter(
      (gameCheck) => !selectedGames.includes(gameCheck)
    );

    query.appid = isOthersSelected
      ? { $nin: notSelectedInBaseGames }
      : { $in: selectedGames };
  }
  return query;
};

export { getQueryForMarketHistory };
