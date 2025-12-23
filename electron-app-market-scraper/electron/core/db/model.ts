import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { accountTable, listingsTable, snapshotsTable } from "./schema";

type SnapshotRowModel = InferSelectModel<typeof snapshotsTable>;
type ListingRowModel = InferSelectModel<typeof listingsTable>;
type AccountModel = InferSelectModel<typeof accountTable>;

type NewSnapshotModel = InferInsertModel<typeof snapshotsTable>;
type NewListingModel = InferInsertModel<typeof listingsTable>;
type NewAccountModel = InferInsertModel<typeof accountTable>;

export type {
  SnapshotRowModel,
  ListingRowModel,
  AccountModel,
  NewListingModel,
  NewSnapshotModel,
  NewAccountModel,
};
