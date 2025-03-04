import { Filter } from "mongodb";
import type {
  TMarketActions,
  TMarketGames,
  TMarketHistoryModel,
} from "./market-history.model";

const getSearchQuery = (search?: string): Filter<TMarketHistoryModel> => {
  if (!search) return {};
  return {
    market_hash_name: {
      $regex: search,
      $options: "i",
    },
  };
};

const getActionsQuery = (
  actions?: TMarketActions[]
): Filter<TMarketHistoryModel> => {
  if (!actions) return {};
  return { event_action: { $in: actions } };
};

const getGamesQuery = (games?: TMarketGames[]): Filter<TMarketHistoryModel> => {
  if (!games) return {};

  const baseGames: number[] = [252490, 440, 730];
  const isOthersSelected = games.includes("Others");
  const selectedGames = games.filter((game) => game !== "Others").map(Number);

  const notSelectedInBaseGames = baseGames.filter(
    (gameCheck) => !selectedGames.includes(gameCheck)
  );

  return {
    appid: isOthersSelected
      ? { $nin: notSelectedInBaseGames }
      : { $in: selectedGames },
  };
};

export { getSearchQuery, getActionsQuery, getGamesQuery };
