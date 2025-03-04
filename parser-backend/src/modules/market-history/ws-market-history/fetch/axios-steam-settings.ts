import axios from "axios";

const axiosSteamInstance = axios.create({
  headers: {
    Referer: "https://steamcommunity.com/market/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    accept: "text/javascript, text/html, application/xml, text/xml, */*",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "sec-ch-ua":
      '"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
  },
});

export { axiosSteamInstance };
