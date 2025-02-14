import { TTransaction } from "@/types/transaction.types";
import transactions from "./../market-history-sec-3.01.2025.json";

const getTransactions = (): TTransaction[] => {
  return transactions as TTransaction[];
};

export default getTransactions;
