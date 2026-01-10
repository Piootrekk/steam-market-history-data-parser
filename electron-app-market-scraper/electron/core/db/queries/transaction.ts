import type { Db } from "..";

type DbTransaction = Omit<Db, "$client">;

const transactionSession = <T = void>(
  db: Db,
  callback: (tx: DbTransaction) => T
): T => {
  return db.transaction(
    (tx: DbTransaction) => {
      return callback(tx);
    },
    { behavior: "deferred" }
  );
};

export { transactionSession };
export type { DbTransaction };
