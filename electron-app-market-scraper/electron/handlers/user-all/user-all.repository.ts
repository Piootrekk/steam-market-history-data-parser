import { getAllSteamIdsFromAccount } from "../../core/db/queries/get";
import { getDbInstance } from "../../db.config";

const getAllUsersRepostiory = async () => {
  const db = getDbInstance();
  const accounts = await getAllSteamIdsFromAccount(db);
  return accounts;
};

export { getAllUsersRepostiory };
