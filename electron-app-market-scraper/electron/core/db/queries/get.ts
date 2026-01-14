import type { Db } from "..";
import { accountTable, listingsTable, snapshotsTable } from "../schema";
import { desc, eq, getTableColumns } from "drizzle-orm";

const getAllSteamIdsFromAccounts = async (db: Db) => {
  const steamIds = await db
    .select({ steamid: accountTable.steamId })
    .from(accountTable);
  return steamIds;
};

const getListingsForCurrentAccountSteamId = async (
  db: Db,
  steamId: string,
  start: number,
  limit: number
) => {
  const response = await db
    .select({
      ...getTableColumns(listingsTable),
    })
    .from(listingsTable)
    .innerJoin(snapshotsTable, eq(listingsTable.snapshotId, snapshotsTable.id))
    .innerJoin(accountTable, eq(snapshotsTable.accountId, accountTable.id))
    .where(eq(accountTable.steamId, steamId))
    .orderBy(desc(listingsTable.timeEvent))
    .limit(limit)
    .offset(start);
  return response;
};

export { getAllSteamIdsFromAccounts, getListingsForCurrentAccountSteamId };
