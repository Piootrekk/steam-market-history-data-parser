import { FastifyReply, FastifyRequest } from "fastify";
import {
  getMarketHistoryDocumentCount,
  getMarketHistoryItems,
  getMarketHistoryCollections,
} from "@/modules/db/market-history/market-history.actions";
import CustomError from "@config/error-converter";
import { getDatabase } from "@/config/get-database";
import promiseAll from "@/config/promise-all";
import type {
  TMarketActions,
  TMarketGames,
  TMarketHistoryModel,
} from "@/modules/db/market-history/market-history.model";

const collectionsMarketNameController = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const db = getDatabase(request);
    const collectionsName = await getMarketHistoryCollections(db);
    reply.status(200).send({ collections: collectionsName });
  } catch (error) {
    const customError = new CustomError({ unknownError: error });
    reply
      .status(customError.getStatus || 400)
      .send({ message: customError.message });
  }
};

type TRequestQuery = {
  collectionName: string;
  search?: string;
  skip?: number;
  limit?: number;
  actions?: TMarketActions[];
  games?: TMarketGames[];
};

const pageItemsController = async (
  request: FastifyRequest<{ Querystring: TRequestQuery }>,
  reply: FastifyReply
): Promise<void> => {
  try {
    const db = getDatabase(request);
    const { collectionName, search, skip, limit, actions, games } =
      request.query;

    const [currentItems, totalCount] = await promiseAll<
      [TMarketHistoryModel[], number]
    >([
      () =>
        getMarketHistoryItems(
          db,
          collectionName,
          search,
          skip,
          limit,
          actions,
          games
        ),
      () =>
        getMarketHistoryDocumentCount(
          db,
          collectionName,
          search,
          actions,
          games
        ),
    ]);
    reply.status(200).send({ items: currentItems, total_count: totalCount });
  } catch (error) {
    const customError = new CustomError({ unknownError: error });
    reply
      .status(customError.getStatus || 400)
      .send({ message: customError.message });
  }
};

export { collectionsMarketNameController, pageItemsController };
