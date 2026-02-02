import { getDbInstance } from "../../db.config";
import {
  insertBulkNewListings,
  insertNewAccount,
  insertNewSnapshot,
  transactionSession,
} from "./fetch-all.repository";
import { sendStartProgress } from "../common/send-progress.emit";
import {
  sendAccountCreated,
  sendDbInsertCorrecty,
  sendMessageFromFetchQueue,
} from "./fetch-all.emits";
import {
  firstListingsFetch,
  getBatches,
  otherListingsFetches,
} from "../../core/domain/fetch-market-listings/fetch-queue";

const fetchAllService = async (
  webContents: Electron.WebContents,
  steamid: string,
  cookies: string,
) => {
  const db = getDbInstance();
  await transactionSession(db, async (tx) => {
    sendStartProgress(webContents);
    const accountId = await insertNewAccount(tx, { steamId: steamid });
    sendAccountCreated(webContents, steamid);

    const { totalCount, listings } = await firstListingsFetch(
      cookies,
      (message, status) =>
        sendMessageFromFetchQueue(webContents, message, status),
    );

    const newSnapshot = await insertNewSnapshot(tx, {
      totalCount: totalCount,
      accountId,
    });

    await insertBulkNewListings(tx, listings, newSnapshot.id);
    sendDbInsertCorrecty(webContents, listings.length);

    const batches = getBatches(totalCount, (message, status) =>
      sendMessageFromFetchQueue(webContents, message, status),
    );
    await otherListingsFetches(
      totalCount,
      cookies,
      batches,
      (message, status) =>
        sendMessageFromFetchQueue(webContents, message, status),
      async (otherListings) => {
        await insertBulkNewListings(tx, otherListings, newSnapshot.id);
        sendDbInsertCorrecty(webContents, otherListings.length);
      },
    );
  });
};

export { fetchAllService };
