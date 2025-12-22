import { useMatch } from "react-router-dom";
import { ROUTE_PATHS } from "src/routes";

const useAccountSubRoute = () => {
  const isSync = useMatch("/accounts/:accountId/sync");
  const isConfig = useMatch("/accounts/:accountId/config");

  if (isSync) return ROUTE_PATHS.accountSync;
  if (isConfig) return ROUTE_PATHS.accountConfig;

  return "";
};

export { useAccountSubRoute };
