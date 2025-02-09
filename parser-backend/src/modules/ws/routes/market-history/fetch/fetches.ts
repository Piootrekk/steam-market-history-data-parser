import CustomError from "@config/error-converter";
import { axiosSteamInstance } from "./axios-steam-settings";
import TMarketHistoryResponse, {
  TIncorrectMarketHistoryResponse,
} from "./fetch.types";

const isIncorrectResponse = (
  data: TMarketHistoryResponse | TIncorrectMarketHistoryResponse
): data is TIncorrectMarketHistoryResponse => {
  return (
    data.total_count === 0 &&
    data.listings === false &&
    Array.isArray(data.assets) &&
    data.assets.length === 0 &&
    data.events === undefined
  );
};

const fetchMarketHistory = async (min = 0, max = 1, cookies: string) => {
  const url = new URL("https://steamcommunity.com/market/myhistory/render/");

  const params = new URLSearchParams({
    query: "",
    start: min.toString(),
    count: max.toString(),
    norender: "1",
  });

  url.search = params.toString();

  const response = await axiosSteamInstance.get<
    TMarketHistoryResponse | TIncorrectMarketHistoryResponse
  >(url.href, {
    headers: {
      Cookie: cookies,
    },
  });

  if (!response.data)
    throw new CustomError({
      customError: { message: "Data not found", status: 418 },
    });
  if (isIncorrectResponse(response.data)) {
    throw new CustomError({
      customError: {
        message: "Received incorrect market history response",
        status: 409,
      },
    });
  }
  if (!response.data.success)
    throw new CustomError({
      customError: { message: "Fetching success - false", status: 418 },
    });
  return response.data;
};

export { fetchMarketHistory };
