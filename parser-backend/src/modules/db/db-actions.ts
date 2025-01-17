import { Db } from "mongodb";

const clearCollectionByName = async (collectionName: string, db: Db) => {
  const collection = db.collection(collectionName);
  await collection.deleteMany();
};

const getDocumentsCount = async (
  collectionName: string,
  db: Db
): Promise<number> => {
  const collection = db.collection(collectionName);
  return collection.countDocuments();
};

export { clearCollectionByName, getDocumentsCount };
