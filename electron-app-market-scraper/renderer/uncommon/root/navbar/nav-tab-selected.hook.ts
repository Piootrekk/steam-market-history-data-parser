import { useMatch } from "react-router-dom";
import { ROUTE_PATHS } from "@renderer/routes";

const useAccountSubRoute = () => {
  const baseAccount = `/${ROUTE_PATHS.accounts}/${ROUTE_PATHS.account}`;

  const isSync = useMatch(`${baseAccount}/${ROUTE_PATHS.accountSync}`);
  const isConfig = useMatch(`${baseAccount}/${ROUTE_PATHS.accountConfig}`);

  if (isSync) return ROUTE_PATHS.accountSync;
  if (isConfig) return ROUTE_PATHS.accountConfig;
  return "";
};

export { useAccountSubRoute };
