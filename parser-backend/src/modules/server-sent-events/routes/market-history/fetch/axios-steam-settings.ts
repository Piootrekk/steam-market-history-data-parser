import axios from "axios";

const axiosSteamInstance = axios.create({
  headers: {
    Referer: "https://steamcommunity.com/market/",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
});

export { axiosSteamInstance };
