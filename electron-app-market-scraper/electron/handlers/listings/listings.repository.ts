import {
  getListingsForCurrentAccount,
  getAllListings,
} from "@electron/core/db/queries/get";
import { getDbInstance } from "@electron/db.config";

const listingsRepostiory = async (
  accountId: number,
  start: number,
  limit: number,
  query?: string,
) => {
  const db = getDbInstance();
  const listings = await getListingsForCurrentAccount(
    db,
    accountId,
    start,
    limit,
    query,
  );
  return listings;
};

const listingsAllRepostiory = async (
  start: number,
  limit: number,
  query?: string,
) => {
  const db = getDbInstance();
  const listings = await getAllListings(db, start, limit, query);
  return listings;
};

export { listingsRepostiory, listingsAllRepostiory };
