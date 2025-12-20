import type { Db } from ".";
import { accountTable } from "./schema";

const getAllSteamIdsFromAccounts = async (db: Db) => {
  const steamIds = await db
    .select({ steamid: accountTable.steamId })
    .from(accountTable);
  return steamIds;
};

export { getAllSteamIdsFromAccounts };
