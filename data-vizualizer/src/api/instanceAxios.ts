import axios from "axios";
import { getBackend } from "../common/utils/env";

const axiosInstance = axios.create({
  baseURL: getBackend(),
});

export default axiosInstance;
