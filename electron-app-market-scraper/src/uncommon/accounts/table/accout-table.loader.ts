import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import { TABLE_PARAMS } from "src/routes";

const accountTableLoader = async ({ params, request }: LoaderFunctionArgs) => {
  const { accountId } = params;
  if (!accountId) {
    throw new Response("Missing accountId", { status: 400 });
  }
  const url = new URL(request.url);
  const start = Number(url.searchParams.get(TABLE_PARAMS.start) ?? 0);
  const limit = Number(url.searchParams.get(TABLE_PARAMS.limit) ?? 50);
  const listingsCount =
    await window.electronAPI.getCountListingsFromSteamId(accountId);
  if (!listingsCount.ok) throw new Response("Not Found", { status: 404 });
  const listings = await window.electronAPI.getListingsFromSteamId(
    accountId,
    start,
    limit,
  );
  return { listings, listingsCount: listingsCount.countListings };
};

const useAccountTableInvoices = () => {
  const listings = useLoaderData<typeof accountTableLoader>();
  return listings;
};

export { accountTableLoader, useAccountTableInvoices };
