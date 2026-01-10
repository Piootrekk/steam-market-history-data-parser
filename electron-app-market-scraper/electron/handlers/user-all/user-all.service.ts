import { getAllUsersRepostiory } from "./user-all.repository";

const allUsersService = async () => {
  const accounts = await getAllUsersRepostiory();
  const steamIds = accounts.map((account) => account.steamid);
  return steamIds;
};
export { allUsersService };
