import {
  listingsCountAllRepository,
  listingsCountRepository,
} from "./listings-count.repostitory";

const listingsCountService = async (
  steamId: string,
  query?: string,
): Promise<ValidationReturn<ListingsCount>> => {
  const listings = await listingsCountRepository(steamId, query);
  if (listings === undefined) throw new Error("Invalid count amount");
  return {
    ok: true,
    countListings: listings.count,
  };
};

const listingsCountAllService = async (
  query?: string,
): Promise<ValidationReturn<ListingsCount>> => {
  const listings = await listingsCountAllRepository(query);
  if (listings === undefined) throw new Error("Invalid count amount");
  return {
    ok: true,
    countListings: listings.count,
  };
};

export { listingsCountService, listingsCountAllService };
