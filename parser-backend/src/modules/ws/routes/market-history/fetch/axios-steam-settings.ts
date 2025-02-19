import axios from "axios";

const axiosSteamInstance = axios.create({
  headers: {
    Referer: "https://steamcommunity.com/market/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    accept: "text/javascript, text/html, application/xml, text/xml, */*",
    "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-ch-ua":
      '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
  },
});

export { axiosSteamInstance };
