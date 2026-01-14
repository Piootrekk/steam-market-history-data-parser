import { getListingsForCurrentAccountSteamId } from "../../core/db/queries/get";
import { getDbInstance } from "../../db.config";

const listingsRepostiory = async (
  steamId: string,
  start: number,
  limit: number
) => {
  const db = getDbInstance();
  const listings = await getListingsForCurrentAccountSteamId(
    db,
    steamId,
    start,
    limit
  );
  return listings;
};

export { listingsRepostiory };
