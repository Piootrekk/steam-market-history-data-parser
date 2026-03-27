import { useParams } from "react-router-dom";
import { useUserNavInvoices } from "../root/navbar/sidebar.loader";

const useSteamIdFromParam = () => {
  const { accountId } = useParams();
  if (!accountId) throw new Error("Param accountId not exist in this route.");
  const users = useUserNavInvoices();
  const user = users.find((user) => user.id.toString() === accountId);
  if (!user) throw new Error("SteamId not found for this path/param.");
  return user.steamid;
};

export { useSteamIdFromParam };
