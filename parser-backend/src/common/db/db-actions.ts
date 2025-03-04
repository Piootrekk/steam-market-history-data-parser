import { CollectionInfo, Db } from "mongodb";

const clearCollectionByName = async (
  collectionName: string,
  db: Db
): Promise<void> => {
  const collection = db.collection(collectionName);
  await collection.drop();
};

const getDocumentsCount = async (
  collectionName: string,
  db: Db
): Promise<number> => {
  const collection = db.collection(collectionName);
  return collection.countDocuments();
};

const getAllCollections = async (db: Db): Promise<string[]> => {
  const collections: CollectionInfo[] = await db.listCollections().toArray();
  const collectionsNames: string[] = collections.map((col) => col.name);
  return collectionsNames;
};

export { clearCollectionByName, getDocumentsCount, getAllCollections };
