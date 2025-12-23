import type { Db } from "..";
import type {
  NewAccountModel,
  NewListingModel,
  NewSnapshotModel,
} from "../model";
import { accountTable, listingsTable, snapshotsTable } from "../schema";
import type { DbTransaction } from "./transaction";

const insertNewAccount = async (
  db: Db | DbTransaction,
  newAccount: NewAccountModel
) => {
  await db.insert(accountTable).values(newAccount);
};

const insertNewSnapshot = async (
  db: Db | DbTransaction,
  newSnapshot: NewSnapshotModel
) => {
  await db.insert(snapshotsTable).values(newSnapshot);
};

const insertBulkNewListings = async (
  db: Db | DbTransaction,
  newListings: NewListingModel[]
) => {
  db.insert(listingsTable).values(newListings);
};

export { insertNewAccount, insertNewSnapshot, insertBulkNewListings };
