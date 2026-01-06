import { FetchError } from "../../global-utils/custom-error";
import type {
  IncorrectMarketFetchResponse,
  MarketRawResponse,
} from "./raw-fetch-response.types";

type FetchParams = {
  start: number;
  count: number;
  cookies: string;
};

const fetchMarketHistory = async (fetchConfig: FetchParams) => {
  const response = await fetchMarketHistoryResponse(fetchConfig);
  if (response.status === 429)
    throw new FetchError("Response 429", "ToManyRequestsError");
  else if (!response.ok)
    throw new FetchError("Response not okay", "ResponseNotOk");
  const data: MarketRawResponse = await response.json();
  if (data.total_count === 0)
    throw new Error("Cookies expired or there is no data to fetch");
  if (isIncorrectResponse(data))
    throw new FetchError("Invalid data", "InvalidResponseError");
  return data;
};

const isIncorrectResponse = (
  data: MarketRawResponse
): data is IncorrectMarketFetchResponse => {
  return (
    data.total_count === 0 &&
    data.listings === false &&
    Array.isArray(data.assets) &&
    data.assets.length === 0 &&
    data.events === undefined
  );
};

const fetchMarketHistoryResponse = async (fetchConfig: FetchParams) => {
  const { start, count, cookies } = fetchConfig;
  const url = new URL("https://steamcommunity.com/market/myhistory/render/");
  const queryParams = new URLSearchParams({
    start: start.toString(),
    count: count.toString(),
    norender: "1",
    l: "english",
  });
  url.search = queryParams.toString();
  const response = await fetch(url, {
    headers: {
      Cookie: cookies,
    },
  });
  return response;
};

export { fetchMarketHistory };
export type { FetchParams };
