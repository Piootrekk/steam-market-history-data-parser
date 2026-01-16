import { getCountIdsFromAccount } from "../../core/db/queries/get";
import { getDbInstance } from "../../db.config";

const listingsCountRepository = async (steamId: string) => {
  const db = getDbInstance();
  const listingsCount = await getCountIdsFromAccount(db, steamId);
  return listingsCount;
};

export { listingsCountRepository };
