import { allUsersService } from "./user-all.service";

const userAllController = () => {
  return allUsersService();
};
export { userAllController };
