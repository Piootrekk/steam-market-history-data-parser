import { relations, sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

const snapshots = sqliteTable("snapshots", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: integer("time_event")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  steamId: text("steam_id").notNull(),
});

const listings = sqliteTable("listings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  listingId: text("listing_id").unique(),
  evenType: integer("event_type").notNull(),
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
  snapshotId: integer("snapshot_id")
    .notNull()
    .references(() => snapshots.id, { onDelete: "cascade" }),
});

const snapshotsRelations = relations(snapshots, ({ many }) => ({
  listings: many(listings),
}));

const listingsRelations = relations(listings, ({ one }) => ({
  snapshot: one(snapshots, {
    fields: [listings.snapshotId],
    references: [snapshots.id],
  }),
}));

export { listings, snapshots, snapshotsRelations, listingsRelations };
