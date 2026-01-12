import type { Db } from "..";

type DbTransaction = Parameters<Parameters<Db["transaction"]>[0]>[0];

const transactionSession = async <T = void>(
  db: Db,
  callback: (tx: DbTransaction) => T | Promise<T>
): Promise<T> => {
  return db.transaction(async (tx) => {
    return callback(tx);
  });
};

export type { DbTransaction };
export { transactionSession };
