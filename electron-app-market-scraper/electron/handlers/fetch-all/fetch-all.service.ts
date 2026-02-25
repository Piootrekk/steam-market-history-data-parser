import {
  getImgIdsFromCurrentSnapshot,
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
import { getDbInstance } from "@electron/db.config";
import {
  getListIconIdFromDir,
  getNewIconIds,
} from "@electron/core/domain/images-downloader/compare";
import { getAllIcons } from "@electron/core/domain/images-downloader/download";

const fetchAllService = async (
  progressEmitter: ProgressEmitter,
  steamid: string,
  cookies: string,
) => {
  const db = getDbInstance();
  const snapshotId = await transactionSession(db, async (tx) => {
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
    return newSnapshot.id;
  });
  progressEmitter.sendFinishProgress();
  const [imagesDir, snapshotImages] = await Promise.all([
    getListIconIdFromDir(process.env.IMAGE_STORAGE_PATH),
    getImgIdsFromCurrentSnapshot(db, snapshotId),
  ]);

  const newImages = getNewIconIds(snapshotImages, imagesDir);
  progressEmitter.sendDownloadNewIcons(newImages.length);
  const logs = await getAllIcons(newImages, process.env.IMAGE_STORAGE_PATH);
  progressEmitter.sendMessage(
    logs.length ? `Logs: ${logs.toString()}` : "All images are synchronized.",
    "success",
  );
};

export { fetchAllService };
