import { paths } from "./types/api.types";
import axiosInstance from "./instanceAxios";

const getInventoryHistoryCollectionsName = async (): Promise<string[]> => {
  const names = await axiosInstance.get<
    paths["/inventory/collections-inventory"]["get"]["responses"]["200"]["content"]["application/json"]
  >("/inventory/collections-inventory");
  if (!names.data) throw new Error("No data found");
  return names.data.collections;
};

export { getInventoryHistoryCollectionsName };
