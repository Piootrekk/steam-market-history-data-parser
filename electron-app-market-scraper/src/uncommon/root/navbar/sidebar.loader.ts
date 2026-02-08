import { useLoaderData } from "react-router-dom";

const usersNavLoader = async () => {
  const allUsersId = await window.electronAPI.getAllUsers();
  return allUsersId;
};

const useUserNavInvoices = () => {
  const usersId = useLoaderData<typeof usersNavLoader>();
  return usersId;
};
export { usersNavLoader, useUserNavInvoices };
