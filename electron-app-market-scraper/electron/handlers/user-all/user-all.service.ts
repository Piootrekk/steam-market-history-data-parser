import { userAllRepository } from "./user-all.repository";

const userAllService = async () => {
  const accounts = await userAllRepository();
  return accounts;
};
export { userAllService };
