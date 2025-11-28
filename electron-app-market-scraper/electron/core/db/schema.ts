import { relations, sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

const snapshotsTable = sqliteTable("snapshots", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: integer("time_event")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  steamId: text("steam_id").notNull(),
});

const listingsTable = sqliteTable("listings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  listingId: text("listing_id").unique(),
  eventType: integer("event_type").notNull(),
  eventAction: text("event_action").notNull(),
  timeEvent: integer("time_event").notNull(),
  appId: integer("app_id").notNull(),
  price: real("price").notNull(),
  itemId: text("item_id").notNull(),
  currency: integer("currency").notNull(),
  instanceId: text("instance_id").notNull(),
  classId: text("class_id").notNull(),
  originalAmount: integer("original_amount").notNull(),
  backgroundColor: text("background_color").notNull(),
  urlIcon: text("url_icon").notNull(),
  nameColor: text("name_color").notNull(),
  marketHashName: text("market_hash_name").notNull(),
  steamidActor: text("steam_id_actor"),
  snapshotId: integer("snapshot_id")
    .notNull()
    .references(() => snapshotsTable.id, { onDelete: "cascade" }),
});

const snapshotsRelations = relations(snapshotsTable, ({ many }) => ({
  listings: many(listingsTable),
}));

const listingsRelations = relations(listingsTable, ({ one }) => ({
  snapshot: one(snapshotsTable, {
    fields: [listingsTable.snapshotId],
    references: [snapshotsTable.id],
  }),
}));

export { listingsTable, snapshotsTable, snapshotsRelations, listingsRelations };
