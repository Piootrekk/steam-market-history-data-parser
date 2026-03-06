import { ROUTE_ID } from "@renderer/routes";
import { useRouteLoaderData } from "react-router-dom";

const usersNavLoader = async () => {
  const allUsersId = await window.electronAPI.getAllUsers();
  return allUsersId;
};

const useUserNavInvoices = () => {
  const users = useRouteLoaderData<typeof usersNavLoader>(ROUTE_ID.root);
  if (users === undefined) throw new Error("Users loader/route not exist.");
  return users;
};
export { usersNavLoader, useUserNavInvoices };
