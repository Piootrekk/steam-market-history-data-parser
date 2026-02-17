import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import { TABLE_PARAMS } from "@renderer/routes";

const allListingsLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  const start = Number(url.searchParams.get(TABLE_PARAMS.start) ?? 0);
  const limit = Number(url.searchParams.get(TABLE_PARAMS.limit) ?? 50);
  const query = url.searchParams.get(TABLE_PARAMS.query) ?? undefined;
  if (Number.isNaN(start) || Number.isNaN(limit))
    throw new Error("Param start & number should be a number!");

  const listingsCount = await window.electronAPI.getCountAllListings(query);
  if (!listingsCount.ok) throw new Response("Not Found", { status: 404 });

  const listings = await window.electronAPI.getListingsAll(start, limit, query);
  return { listings, listingsCount: listingsCount.countListings };
};

const useAllListingsInvoices = () => {
  const listings = useLoaderData<typeof allListingsLoader>();
  return listings;
};

export { allListingsLoader, useAllListingsInvoices };
