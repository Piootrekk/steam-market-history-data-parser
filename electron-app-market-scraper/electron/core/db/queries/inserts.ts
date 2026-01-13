import type { Db } from "..";
import type {
  NewAccountModel,
  NewListingModel,
  NewSnapshotModel,
} from "../model";
import { accountTable, listingsTable, snapshotsTable } from "../schema";
import type { DbTransaction } from "./transaction";

const insertNewAccount = async (
  db: DbTransaction,
  newAccount: NewAccountModel
) => {
  const insertResult = await db
    .insert(accountTable)
    .values(newAccount)
    .returning({ id: accountTable.id })
    .get();

  return insertResult.id;
};

const insertNewSnapshot = async (
  db: Db | DbTransaction,
  newSnapshot: NewSnapshotModel
) => {
  const insertedSnapshot = await db
    .insert(snapshotsTable)
    .values(newSnapshot)
    .returning()
    .get();
  return insertedSnapshot;
};

const insertBulkNewListings = async (
  db: Db | DbTransaction,
  newListings: Omit<NewListingModel, "snapshotId">[],
  snapshotId: number
) => {
  const listingsWithSnapshot = newListings.map((listing) => ({
    ...listing,
    snapshotId,
  }));

  await db.insert(listingsTable).values(listingsWithSnapshot);
};
export { insertNewAccount, insertNewSnapshot, insertBulkNewListings };
