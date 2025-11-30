import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { listingsTable, snapshotsTable } from "./schema";

type SnapshotRowModel = InferSelectModel<typeof snapshotsTable>;
type ListingRowModel = InferSelectModel<typeof listingsTable>;

type NewSnapshotModel = InferInsertModel<typeof snapshotsTable>;
type NewListingModel = InferInsertModel<typeof listingsTable>;

export type {
  SnapshotRowModel,
  ListingRowModel,
  NewListingModel,
  NewSnapshotModel,
};
