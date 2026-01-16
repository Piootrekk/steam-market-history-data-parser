import { listingsCountRepository } from "./listings-count.repostitory";

const listingsCountService = async (
  steamId: string,
  limit: number
): Promise<ValidationReturn<ListingsCount>> => {
  const listingsId = await listingsCountRepository(steamId);
  if (listingsId === undefined) throw new Error("Invalid count amount");
  const pageAmount = Math.ceil(listingsId.count / limit);
  return {
    ok: true,
    countListings: listingsId.count,
    pageAmount,
  };
};

export { listingsCountService };
