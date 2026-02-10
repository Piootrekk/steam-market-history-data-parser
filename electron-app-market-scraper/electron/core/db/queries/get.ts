import type { Db } from "..";
import { accountTable, listingsTable, snapshotsTable } from "../schema";
import { and, count, desc, eq, getTableColumns, like } from "drizzle-orm";

const getAllSteamIdsFromAccount = async (db: Db) => {
  const steamIds = await db
    .select({ steamid: accountTable.steamId })
    .from(accountTable);
  return steamIds;
};

const getListingsForCurrentAccountSteamId = async (
  db: Db,
  steamId: string,
  start: number,
  limit: number,
  query?: string,
) => {
  const whereClause = and(
    eq(accountTable.steamId, steamId),
    query ? like(listingsTable.marketHashName, `%${query.trim()}%`) : undefined,
  );

  const response = await db
    .select({
      ...getTableColumns(listingsTable),
    })
    .from(listingsTable)
    .innerJoin(snapshotsTable, eq(listingsTable.snapshotId, snapshotsTable.id))
    .innerJoin(accountTable, eq(snapshotsTable.accountId, accountTable.id))
    .where(whereClause)
    .orderBy(desc(listingsTable.timeEvent))
    .limit(limit)
    .offset(start);
  return response;
};

const getCountIdsFromAccount = async (
  db: Db,
  steamId: string,
  query?: string,
) => {
  const whereClause = and(
    eq(accountTable.steamId, steamId),
    query ? like(listingsTable.marketHashName, `%${query.trim()}%`) : undefined,
  );
  const response = await db
    .select({
      count: count(),
    })
    .from(listingsTable)
    .innerJoin(snapshotsTable, eq(listingsTable.snapshotId, snapshotsTable.id))
    .innerJoin(accountTable, eq(snapshotsTable.accountId, accountTable.id))
    .where(whereClause)
    .get();
  return response;
};

const getListingsColumnsNames = () => {
  const listingsObject = getTableColumns(listingsTable);
  const listingsNames = Object.keys(listingsObject);
  return listingsNames;
};

const getAccountIdBySteamId = async (db: Db, steamid: string) => {
  const response = await db
    .select({ accountId: accountTable.id })
    .from(accountTable)
    .where(eq(accountTable.steamId, steamid))
    .get();
  return response;
};

export {
  getAllSteamIdsFromAccount,
  getListingsForCurrentAccountSteamId,
  getCountIdsFromAccount,
  getListingsColumnsNames,
  getAccountIdBySteamId,
};
