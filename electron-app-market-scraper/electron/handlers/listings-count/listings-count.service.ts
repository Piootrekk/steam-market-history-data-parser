import { listingsCountRepository } from "./listings-count.repostitory";

const listingsCountService = async (
  steamId: string,
): Promise<ValidationReturn<ListingsCount>> => {
  const listingsId = await listingsCountRepository(steamId);
  if (listingsId === undefined) throw new Error("Invalid count amount");
  return {
    ok: true,
    countListings: listingsId.count,
  };
};

export { listingsCountService };
