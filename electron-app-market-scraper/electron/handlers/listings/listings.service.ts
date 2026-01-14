import { listingsDto } from "./listings.dto";
import { listingsRepostiory } from "./listings.repository";

const ListingsService = async (
  steamId: string,
  start: number,
  limit: number
) => {
  const listings = await listingsRepostiory(steamId, start, limit);
  const transformListings = listingsDto(listings);
  return transformListings;
};

export { ListingsService };
