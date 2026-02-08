import { getDbInstance } from "../../db.config";
import {
  getAccountIdBySteamId,
  getCountIdsFromAccount,
  insertBulkNewListings,
  transactionSession,
} from "./fetch-sync.repository";
import {
  firstListingsFetch,
  getBatches,
  otherListingsFetches,
} from "../../core/domain/fetch-market-listings/fetch-queue";
import type { ProgressEmitter } from "./fetch-sync.emits";
import { BASE_CONFIG } from "../../core/domain/fetch-market-listings/base.config";
import { insertNewSnapshot } from "../fetch-all/fetch-all.repository";

const fetchSyncService = async (
  progressEmitter: ProgressEmitter,
  steamid: string,
  cookies: string,
) => {
  const db = getDbInstance();
  const listingsAmount = await getCountIdsFromAccount(db, steamid);
  const accountId = await getAccountIdBySteamId(db, steamid);

  if (!listingsAmount || !accountId)
    throw new Error("Invalid accountId or listings lenght equal 0");

  const listingsLengthDb = listingsAmount.count;

  const { totalCount, listings } = await firstListingsFetch(
    cookies,
    (message, status) => progressEmitter.sendMessage(message, status),
  );
  const countDiff = totalCount - listingsLengthDb;

  if (listingsLengthDb === totalCount) {
    progressEmitter.nothingChanges(listingsLengthDb, totalCount);
    return;
  }
  if (totalCount < listingsLengthDb)
    throw new Error(
      "Data in desync, delete and refetch all again. Or incorrect cookies to account.",
    );
  transactionSession(db, async (tx) => {
    progressEmitter.newLitsings(countDiff);
    const newSnapshot = await insertNewSnapshot(tx, {
      totalCount,
      accountId: accountId.accountId,
    });

    if (countDiff <= BASE_CONFIG.maxCount) {
      const slicedListings = listings.slice(0, countDiff);
      await insertBulkNewListings(tx, slicedListings, newSnapshot.id);
      progressEmitter.sendDbInsertCorrectly(slicedListings.length);
    } else {
      const batches = getBatches(totalCount, (message, status) =>
        progressEmitter.sendMessage(message, status),
      );
      await otherListingsFetches(
        totalCount,
        cookies,
        batches,
        (message, status) => progressEmitter.sendMessage(message, status),
        async (otherListings) => {
          await insertBulkNewListings(tx, otherListings, newSnapshot.id);
          progressEmitter.sendDbInsertCorrectly(otherListings.length);
        },
      );
      progressEmitter.sendFinishProgress();
    }
  });
};

export { fetchSyncService };
