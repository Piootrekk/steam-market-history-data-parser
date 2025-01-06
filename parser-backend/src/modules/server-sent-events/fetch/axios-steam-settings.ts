import axios from "axios";
import { getCookies } from "../../../config/env";

const axiosSteamInstance = axios.create({
  headers: {
    Referer: "https://steamcommunity.com/market/",
    Cookie: getCookies(),
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
});

export { axiosSteamInstance };
