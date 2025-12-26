import { relations, sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

const accountTable = sqliteTable("accounts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: integer("time_event")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  steamId: text("steam_id").notNull().unique(),
});

const snapshotsTable = sqliteTable("snapshots", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: integer("time_event")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  totalCount: integer("total_count").notNull(),
  accountId: integer("account_id")
    .notNull()
    .references(() => accountTable.id, { onDelete: "cascade" }),
});

const logsTable = sqliteTable("logs_snapshot", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: integer("time_event")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  status: text("status").notNull(),
  message: text("message").notNull(),
  snapshotId: integer("snapshot_id")
    .notNull()
    .references(() => snapshotsTable.id, { onDelete: "cascade" }),
});

const listingsTable = sqliteTable("listings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  listingId: text("listing_id").unique(),
  purchaseId: text("purchase_id").unique(),
  eventType: integer("event_type").notNull(),
  eventAction: text("event_action").notNull(),
  timeEvent: integer("time_event").notNull(),
  appId: integer("app_id").notNull(),
  game: text("game").notNull(),
  price: real("price").notNull(),
  currency: text("currency").notNull(),
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

const accountRelations = relations(accountTable, ({ many }) => ({
  snapshots: many(snapshotsTable),
}));

const logsRelations = relations(logsTable, ({ one }) => ({
  snapshot: one(snapshotsTable, {
    fields: [logsTable.snapshotId],
    references: [snapshotsTable.id],
  }),
}));

const snapshotsRelations = relations(snapshotsTable, ({ many, one }) => ({
  listings: many(listingsTable),
  account: one(accountTable, {
    fields: [snapshotsTable.accountId],
    references: [accountTable.id],
  }),
}));

const listingsRelations = relations(listingsTable, ({ one }) => ({
  snapshot: one(snapshotsTable, {
    fields: [listingsTable.snapshotId],
    references: [snapshotsTable.id],
  }),
}));

export {
  listingsTable,
  snapshotsTable,
  logsTable,
  accountTable,
  snapshotsRelations,
  listingsRelations,
  accountRelations,
  logsRelations,
};
