import CustomError from "../error-converter";
import axiosInstance from "./axios-settings";
import TMarketHistoryResponse from "./fetch.types";

const fetchMarketHistory = async (min = 0, max = 1) => {
  const url = new URL("https://steamcommunity.com/market/myhistory/render/");

  const params = new URLSearchParams({
    query: "",
    start: min.toString(),
    count: max.toString(),
    norender: "1",
  });

  url.search = params.toString();

  const response = await axiosInstance.get<TMarketHistoryResponse>(url.href);
  if (!response.data) throw new CustomError("Data not found", 418);
  if (!response.data.success)
    throw new CustomError("Fetching success - false", 418);
  return response.data;
};

export { fetchMarketHistory };
