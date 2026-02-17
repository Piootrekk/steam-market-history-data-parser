import { getAllSteamIdsFromAccount } from "@electron/core/db/queries/get";
import { getDbInstance } from "@electron/db.config";

const getAllUsersRepostiory = async () => {
  const db = getDbInstance();
  const accounts = await getAllSteamIdsFromAccount(db);
  return accounts;
};

export { getAllUsersRepostiory };
