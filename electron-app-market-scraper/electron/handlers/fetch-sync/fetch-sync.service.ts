import { getDbInstance } from "../../db.config";
import { getCountIdsFromAccount } from "./fetch-sync.repository";
import { firstListingsFetch } from "../../core/domain/fetch-market-listings/fetch-queue";
import type { ProgressEmitter } from "./fetch-sync.emits";
const fetchSyncService = async (
  progressEmitter: ProgressEmitter,
  steamid: string,
  cookies: string,
) => {
  const db = getDbInstance();
  const listingsAmount = await getCountIdsFromAccount(db, steamid);
  const { totalCount, listings } = await firstListingsFetch(
    cookies,
    (message, status) => _,
  );
};

export { fetchSyncService };
