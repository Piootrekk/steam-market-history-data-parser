import { ObjectId } from "@fastify/mongodb";
import fetchQueue from "./items-coherence/fetch-queue";
import { TSSEClient } from "../../sse-client.types";

const saveAllHistoryToDb = async (
  steamid: string,
  clinet: TSSEClient
): Promise<void> => {
  const _id = new ObjectId();
  const allDate = await fetchQueue();
};

export { saveAllHistoryToDb };
