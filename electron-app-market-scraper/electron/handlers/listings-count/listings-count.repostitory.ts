import {
  getListingsCountFromAccount,
  getAllListingsCount,
} from "../../core/db/queries/get";
import { getDbInstance } from "../../db.config";

const listingsCountRepository = async (steamId: string, query?: string) => {
  const db = getDbInstance();
  const listingsCount = await getListingsCountFromAccount(db, steamId, query);
  return listingsCount;
};

const listingsCountAllRepository = async (query?: string) => {
  const db = getDbInstance();
  const listingsCount = await getAllListingsCount(db, query);
  return listingsCount;
};

export { listingsCountRepository, listingsCountAllRepository };
