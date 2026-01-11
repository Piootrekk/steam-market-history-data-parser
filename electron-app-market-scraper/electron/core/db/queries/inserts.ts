import type { Db } from "..";
import type {
  NewAccountModel,
  NewListingModel,
  NewSnapshotModel,
} from "../model";
import { accountTable, listingsTable, snapshotsTable } from "../schema";
import type { DbTransaction } from "./transaction";

const insertNewAccount = (
  db: Db | DbTransaction,
  newAccount: NewAccountModel
) => {
  const insertResult = db
    .insert(accountTable)
    .values(newAccount)
    .returning({ id: accountTable.id })
    .get();

  return insertResult.id;
};

const insertNewSnapshot = (
  db: Db | DbTransaction,
  newSnapshot: NewSnapshotModel
) => {
  const insertedSnapshot = db
    .insert(snapshotsTable)
    .values(newSnapshot)
    .returning()
    .get();
  return insertedSnapshot;
};

const insertBulkNewListings = async (
  db: Db | DbTransaction,
  newListings: NewListingModel[]
) => {
  db.insert(listingsTable).values(newListings);
};

export { insertNewAccount, insertNewSnapshot, insertBulkNewListings };
