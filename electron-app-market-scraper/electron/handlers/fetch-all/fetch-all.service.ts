import { getDbInstance } from "../../db.config";
import {
  insertBulkNewListings,
  insertNewAccount,
  insertNewSnapshot,
  transactionSession,
} from "./fetch-all.repository";

import {
  firstListingsFetch,
  getBatches,
  otherListingsFetches,
} from "../../core/domain/fetch-market-listings/fetch-queue";
import type { ProgressEmitter } from "./fetch-all.emits";

const fetchAllService = async (
  progressEmitter: ProgressEmitter,
  steamid: string,
  cookies: string,
) => {
  const db = getDbInstance();
  await transactionSession(db, async (tx) => {
    progressEmitter.sendStartProgress();
    const accountId = await insertNewAccount(tx, { steamId: steamid });
    progressEmitter.sendAccountCreated(steamid);

    const { totalCount, listings } = await firstListingsFetch(
      cookies,
      (message, status) =>
        progressEmitter.sendMessageFromFetchQueue(message, status),
    );

    const newSnapshot = await insertNewSnapshot(tx, {
      totalCount: totalCount,
      accountId,
    });

    await insertBulkNewListings(tx, listings, newSnapshot.id);
    progressEmitter.sendDbInsertCorrectly(listings.length);

    const batches = getBatches(totalCount, (message, status) =>
      progressEmitter.sendMessageFromFetchQueue(message, status),
    );
    await otherListingsFetches(
      totalCount,
      cookies,
      batches,
      (message, status) =>
        progressEmitter.sendMessageFromFetchQueue(message, status),
      async (otherListings) => {
        await insertBulkNewListings(tx, otherListings, newSnapshot.id);
        progressEmitter.sendDbInsertCorrectly(otherListings.length);
      },
    );
  });
};

export { fetchAllService };
