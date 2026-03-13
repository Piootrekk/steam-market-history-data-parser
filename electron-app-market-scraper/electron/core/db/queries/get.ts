import { and, count, desc, eq, getTableColumns, like } from "drizzle-orm";
import type { Db } from "..";
import { accountTable, listingsTable, snapshotsTable } from "../schema";

const getAllSteamIdsFromAccount = async (db: Db) => {
  const steamIds = await db
    .select({ steamid: accountTable.steamId, id: accountTable.id })
    .from(accountTable);
  return steamIds;
};

const getListingsForCurrentAccount = async (
  db: Db,
  accountId: number,
  start: number,
  limit: number,
  query?: string,
) => {
  const whereClause = and(
    eq(snapshotsTable.accountId, accountId),
    query ? like(listingsTable.marketHashName, `%${query.trim()}%`) : undefined,
  );

  const response = await db
    .select({
      ...getTableColumns(listingsTable),
    })
    .from(listingsTable)
    .innerJoin(snapshotsTable, eq(listingsTable.snapshotId, snapshotsTable.id))

    .where(whereClause)
    .orderBy(desc(listingsTable.timeEvent))
    .limit(limit)
    .offset(start);
  return response;
};

const getListingsCountFromAccount = async (
  db: Db,
  accountId: number,
  query?: string,
) => {
  const whereClause = and(
    eq(snapshotsTable.accountId, accountId),
    query ? like(listingsTable.marketHashName, `%${query.trim()}%`) : undefined,
  );
  const response = await db
    .select({
      count: count(),
    })
    .from(listingsTable)
    .innerJoin(snapshotsTable, eq(listingsTable.snapshotId, snapshotsTable.id))
    .where(whereClause)
    .get();
  return response;
};

const getListingsColumnsMetadata = () => {
  const columnsMetadata = getTableColumns(listingsTable);
  return columnsMetadata;
};

const getAllListingsCount = async (db: Db, query?: string) => {
  const result = await db
    .select({
      count: count(),
    })
    .from(listingsTable)
    .where(
      query
        ? like(listingsTable.marketHashName, `%${query.trim()}%`)
        : undefined,
    )
    .get();

  return result;
};

const getAllListings = async (
  db: Db,
  start: number,
  limit: number,
  query?: string,
) => {
  return db.query.listingsTable.findMany({
    with: {
      snapshot: {
        with: {
          account: {
            columns: {
              steamId: true,
            },
          },
        },
      },
    },
    where: (listing, { like }) =>
      query ? like(listing.marketHashName, `%${query.trim()}%`) : undefined,
    orderBy: (listing) => [desc(listing.timeEvent)],
    limit,
    offset: start,
  });
};

const getImgIdsFromCurrentSnapshot = async (db: Db, snapshotId: number) => {
  return db
    .selectDistinct({
      urlIcon: listingsTable.urlIcon,
      iconHashStorage: listingsTable.iconHashStorage,
    })
    .from(listingsTable)
    .where(eq(listingsTable.snapshotId, snapshotId));
};

export {
  getAllSteamIdsFromAccount,
  getListingsForCurrentAccount,
  getListingsCountFromAccount,
  getAllListings,
  getAllListingsCount,
  getImgIdsFromCurrentSnapshot,
  getListingsColumnsMetadata,
};
