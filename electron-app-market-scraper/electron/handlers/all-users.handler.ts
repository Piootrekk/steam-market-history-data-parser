import { getAllSteamIdsFromAccounts } from "../core/db/queries/get";
import { getDbInstance } from "../db.config";

const getAllUsersHandler = async () => {
  const db = getDbInstance();
  const accounts = await getAllSteamIdsFromAccounts(db);
  const steamIds = accounts.map((account) => account.steamid);
  return steamIds;
};

export { getAllUsersHandler };
