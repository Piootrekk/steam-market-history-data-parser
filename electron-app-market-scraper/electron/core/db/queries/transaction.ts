import type { Db } from "..";

type DbTransaction = Omit<Db, "$client">;

const transactionSession = async <T>(
  db: Db,
  callback: (tx: DbTransaction) => Promise<T>
): Promise<T> => {
  return await db.transaction(async (tx: DbTransaction) => {
    return await callback(tx);
  });
};

export { transactionSession };
export type { DbTransaction };
