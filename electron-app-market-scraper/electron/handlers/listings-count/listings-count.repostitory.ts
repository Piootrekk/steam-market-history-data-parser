import {
  getAllListingsCount,
  getListingsCountFromAccount,
} from "../../core/db/queries/get";
import { getDbInstance } from "../../db.config";

const listingsCountRepository = async (accountId: number, query?: string) => {
  const db = getDbInstance();
  const listingsCount = await getListingsCountFromAccount(db, accountId, query);
  return listingsCount;
};

const listingsCountAllRepository = async (query?: string) => {
  const db = getDbInstance();
  const listingsCount = await getAllListingsCount(db, query);
  return listingsCount;
};

export { listingsCountRepository, listingsCountAllRepository };
