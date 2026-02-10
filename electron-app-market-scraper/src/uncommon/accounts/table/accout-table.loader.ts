import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import { TABLE_PARAMS } from "src/routes";

const accountTableLoader = async ({ params, request }: LoaderFunctionArgs) => {
  const { steamId } = params;
  if (!steamId) {
    throw new Response("Missing steamId", { status: 400 });
  }
  const url = new URL(request.url);
  const start = Number(url.searchParams.get(TABLE_PARAMS.start) ?? 0);
  const limit = Number(url.searchParams.get(TABLE_PARAMS.limit) ?? 50);
  const query = url.searchParams.get(TABLE_PARAMS.query) ?? undefined;

  if (Number.isNaN(start) || Number.isNaN(limit))
    throw new Error("Param start & number should be a number!");

  const listingsCount = await window.electronAPI.getCountListingsFromSteamId(
    steamId,
    query,
  );
  if (!listingsCount.ok) throw new Response("Not Found", { status: 404 });
  const listings = await window.electronAPI.getListingsFromSteamId(
    steamId,
    start,
    limit,
    query,
  );
  return { listings, listingsCount: listingsCount.countListings };
};

const useAccountTableInvoices = () => {
  const listings = useLoaderData<typeof accountTableLoader>();
  return listings;
};

export { accountTableLoader, useAccountTableInvoices };
