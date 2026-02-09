import { listingsDto } from "./listings.dto";
import { listingsRepostiory } from "./listings.repository";

const listingsService = async (
  steamId: string,
  start: number,
  limit: number,
  query?: string,
) => {
  const listings = await listingsRepostiory(steamId, start, limit, query);
  const transformListings = listingsDto(listings);
  return transformListings;
};

export { listingsService };
