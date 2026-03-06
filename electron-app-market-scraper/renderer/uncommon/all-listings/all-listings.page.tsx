import { Database } from "lucide-react";
import BasicPageInfo from "@renderer/common/components/composites/basic-page-info";
import AccoutAllTable from "./all-lisitngs-table";
import AllListingsEmpty from "./all-listing-empty";
import { useUserNavInvoices } from "../root/navbar/sidebar.loader";

const AllListingsPage = () => {
  const users = useUserNavInvoices();
  return (
    <>
      <BasicPageInfo
        name={"All your saved listings from DB."}
        desc={`Display, search whole listings in table.`}
        Icon={Database}
      />
      {users.length > 0 ? <AccoutAllTable /> : <AllListingsEmpty />}
    </>
  );
};

export default AllListingsPage;
