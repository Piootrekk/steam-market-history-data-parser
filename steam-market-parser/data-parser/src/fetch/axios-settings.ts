import axios from "axios";
import { getCookies } from "../env";

const axiosInstance = axios.create({
  headers: {
    Referer: "https://steamcommunity.com/market/",
    Cookie: getCookies(),
    "Referrer-Policy": "strict-origin-when-cross-origin",
    
  },
});

export default axiosInstance;
