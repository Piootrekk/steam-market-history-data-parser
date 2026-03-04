import {
  insertBulkNewListings,
  insertNewAccount,
  insertNewSnapshot,
  transactionSession,
} from "./fetch-all.repository";

import { createListingsFetcher } from "../../core/domain/fetch-market-listings/listings-fetcher.factory";
import type { ProgressEmitter } from "./fetch-all.emits";
import { getDbInstance } from "@electron/db.config";
import { iconDownloaderService } from "../common/icon-downloader/icon-downloader.service";

const fetchAllService = async (
  progressEmitter: ProgressEmitter,
  steamid: string,
  cookies: string,
) => {
  const db = getDbInstance();
  const fetcher = createListingsFetcher({
    cookies,
    logCallback: progressEmitter.sendMessage,
  });
  const snapshotId = await transactionSession(db, async (tx) => {
    progressEmitter.sendStartProgress();
    const accountId = await insertNewAccount(tx, { steamId: steamid });
    progressEmitter.sendAccountCreated(steamid);

    const { totalCount, listings } = await fetcher.firstListingsFetch();

    const newSnapshot = await insertNewSnapshot(tx, {
      totalCount: totalCount,
      accountId,
    });

    await insertBulkNewListings(tx, listings, newSnapshot.id);
    progressEmitter.sendDbInsertCorrectly(listings.length);

    const batches = fetcher.getBatches(totalCount);

    await fetcher.otherListingsFetches(
      totalCount,
      batches,
      async (otherListings) => {
        await insertBulkNewListings(tx, otherListings, newSnapshot.id);
        progressEmitter.sendDbInsertCorrectly(otherListings.length);
      },
    );
    return newSnapshot.id;
  });
  await iconDownloaderService(snapshotId, progressEmitter);
  progressEmitter.sendFinishProgress();
};

export { fetchAllService };
