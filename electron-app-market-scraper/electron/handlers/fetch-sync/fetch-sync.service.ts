import { getDbInstance } from "../../db.config";
import {
  getCountIdsFromAccount,
  transactionSession,
} from "./fetch-sync.repository";
import { firstListingsFetch } from "../../core/domain/fetch-market-listings/fetch-queue";
import type { ProgressEmitter } from "./fetch-sync.emits";
import { BASE_CONFIG } from "../../core/domain/fetch-market-listings/base.config";
const fetchSyncService = async (
  progressEmitter: ProgressEmitter,
  steamid: string,
  cookies: string,
) => {
  const db = getDbInstance();
  const listingsAmount = await getCountIdsFromAccount(db, steamid);
  const listingsLengthDb = listingsAmount?.count || 0;
  const { totalCount, listings } = await firstListingsFetch(
    cookies,
    (message, status) => progressEmitter.sendMessage(message, status),
  );
  const countDiff = totalCount - listingsLengthDb;

  if (listingsLengthDb === totalCount)
    progressEmitter.nothingChanges(listingsLengthDb, totalCount);
  if (totalCount > listingsLengthDb)
    throw new Error("Data in desync, delete and refetch all again.");
  transactionSession(db, (tx) => {
    progressEmitter.newLitsings(countDiff);
    if (countDiff <= BASE_CONFIG.maxCount) {
      const slicedListings = listings.slice(0, countDiff);
    } else {
    }
  });
};

export { fetchSyncService };
