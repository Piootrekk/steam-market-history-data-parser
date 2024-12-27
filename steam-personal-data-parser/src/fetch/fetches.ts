import axiosInstance from "./axios-settings";
import TMarketHistoryResponse from "./fetch.types";

const fetchMarketHistory = async (min = 0, max = 50) => {
  const url = new URL("https://steamcommunity.com/market/myhistory/render/");

  const params = new URLSearchParams({
    query: "",
    start: min.toString(),
    count: max.toString(),
    norender: "1",
  });

  url.search = params.toString();

  console.log(url.href);
  const response = await axiosInstance.get<TMarketHistoryResponse>(url.href);
  console.log(response.data);
  console.log(response.headers);
};

export { fetchMarketHistory };
