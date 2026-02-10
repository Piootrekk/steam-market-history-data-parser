import { getCountIdsFromAccount } from "../../core/db/queries/get";
import { getDbInstance } from "../../db.config";

const listingsCountRepository = async (steamId: string, query?: string) => {
  const db = getDbInstance();
  const listingsCount = await getCountIdsFromAccount(db, steamId, query);
  return listingsCount;
};

export { listingsCountRepository };
