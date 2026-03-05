const BASE_MARKET_URL = "https://steamcommunity.com/market/listings";

const setupMarketLink = (appId: number | string, marketHashName: string) => {
  const marketLink = `${BASE_MARKET_URL}/${appId}/${marketHashName}`;
  return marketLink;
};

export { setupMarketLink };
