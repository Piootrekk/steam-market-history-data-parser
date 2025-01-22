import { Db } from "mongodb";
import { getAllCollections } from "../db-actions";

const getInventoryHistoryCollections = async (db: Db): Promise<string[]> => {
  const allCollectios = await getAllCollections(db);
  const marketCollections = allCollectios.filter((collection) =>
    collection.includes("IH")
  );
  return marketCollections;
};

export { getInventoryHistoryCollections };
