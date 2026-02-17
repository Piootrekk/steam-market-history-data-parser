import {
  getListingsForCurrentAccountSteamId,
  getAllListings,
} from "@electron/core/db/queries/get";
import { getDbInstance } from "@electron/db.config";

const listingsRepostiory = async (
  steamId: string,
  start: number,
  limit: number,
  query?: string,
) => {
  const db = getDbInstance();
  const listings = await getListingsForCurrentAccountSteamId(
    db,
    steamId,
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
