import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";

const accountTableLoader = async ({ params, request }: LoaderFunctionArgs) => {
  const { accountId } = params;
  if (!accountId) {
    throw new Response("Missing accountId", { status: 400 });
  }
  const url = new URL(request.url);
  const start = Number(url.searchParams.get("start") ?? 0);
  const limit = Number(url.searchParams.get("limit") ?? 25);
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
