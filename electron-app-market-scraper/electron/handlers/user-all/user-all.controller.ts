import { userAllService } from "./user-all.service";

const userAllController = () => {
  return userAllService();
};
export { userAllController };
