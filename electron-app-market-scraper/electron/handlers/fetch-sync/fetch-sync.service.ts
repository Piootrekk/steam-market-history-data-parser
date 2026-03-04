import {
  getListingsCountFromAccount,
  insertBulkNewListings,
  transactionSession,
} from "./fetch-sync.repository";
import { createListingsFetcher } from "../../core/domain/fetch-market-listings/listings-fetcher.factory";
import type { ProgressEmitter } from "./fetch-sync.emits";
import { BASE_CONFIG } from "../../core/domain/fetch-market-listings/base.config";
import { insertNewSnapshot } from "../fetch-all/fetch-all.repository";
import { getDbInstance } from "@electron/db.config";
import { iconDownloaderService } from "../common/icon-downloader/icon-downloader.service";

const fetchSyncService = async (
  progressEmitter: ProgressEmitter,
  accountId: number,
  cookies: string,
) => {
  const db = getDbInstance();
  const fetcher = createListingsFetcher({
    cookies,
    logCallback: progressEmitter.sendMessage,
  });

  const listingsAmount = await getListingsCountFromAccount(db, accountId);

  if (!listingsAmount)
    throw new Error("Invalid accountId or listings lenght equal 0");
  const listingsLengthDb = listingsAmount.count;

  const { totalCount, listings } = await fetcher.firstListingsFetch();
  const countDiff = totalCount - listingsLengthDb;
  if (listingsLengthDb === totalCount) {
    progressEmitter.nothingChanges(listingsLengthDb, totalCount);
    return;
  }
  if (totalCount < listingsLengthDb)
    throw new Error(
      "Data in desync, delete and refetch all again. Or incorrect cookies to account.",
    );
  const snapshotId = await transactionSession(db, async (tx) => {
    progressEmitter.newLitsings(countDiff);
    const newSnapshot = await insertNewSnapshot(tx, {
      totalCount,
      accountId: accountId,
    });

    if (countDiff <= BASE_CONFIG.maxCount) {
      const slicedListings = listings.slice(0, countDiff);
      await insertBulkNewListings(tx, slicedListings, newSnapshot.id);
      progressEmitter.sendDbInsertCorrectly(slicedListings.length);
    } else {
      const batches = fetcher.getBatches(totalCount);

      await fetcher.otherListingsFetches(
        totalCount,
        batches,
        async (otherListings) => {
          await insertBulkNewListings(tx, otherListings, newSnapshot.id);
          progressEmitter.sendDbInsertCorrectly(otherListings.length);
        },
      );
    }
    return newSnapshot.id;
  });
  await iconDownloaderService(snapshotId, progressEmitter);
  progressEmitter.sendFinishProgress();
};

export { fetchSyncService };
