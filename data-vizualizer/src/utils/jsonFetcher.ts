import { TTransaction } from "../types/transaction.types";
import transactions from "./../market-history-main-4.01.2025.json"

const getTransactions = (): TTransaction[] => {
  return transactions as TTransaction[];
};

export default getTransactions;
