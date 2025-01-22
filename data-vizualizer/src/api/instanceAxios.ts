import axios from "axios";
import { getBackend } from "../utils/env";

const axiosInstance = axios.create({
  baseURL: getBackend(),
});

export default axiosInstance;
