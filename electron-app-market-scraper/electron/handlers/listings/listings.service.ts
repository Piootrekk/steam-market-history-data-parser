import { listingsAllDto, listingsDto } from "./listings.dto";
import {
  listingsAllRepostiory,
  listingsRepostiory,
} from "./listings.repository";

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

const listingsAllService = async (
  start: number,
  limit: number,
  query?: string,
) => {
  const listings = await listingsAllRepostiory(start, limit, query);
  const transformListings = listingsAllDto(listings);
  return transformListings;
};

export { listingsService, listingsAllService };
