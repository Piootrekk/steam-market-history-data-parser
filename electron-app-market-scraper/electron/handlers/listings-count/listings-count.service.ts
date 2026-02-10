import { listingsCountRepository } from "./listings-count.repostitory";

const listingsCountService = async (
  steamId: string,
  query?: string,
): Promise<ValidationReturn<ListingsCount>> => {
  const listingsId = await listingsCountRepository(steamId, query);
  if (listingsId === undefined) throw new Error("Invalid count amount");
  return {
    ok: true,
    countListings: listingsId.count,
  };
};

export { listingsCountService };
