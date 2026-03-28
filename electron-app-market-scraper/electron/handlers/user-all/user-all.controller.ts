import { userAllService } from "./user-all.service";

const userAllController = async () => {
  return await userAllService();
};
export { userAllController };
