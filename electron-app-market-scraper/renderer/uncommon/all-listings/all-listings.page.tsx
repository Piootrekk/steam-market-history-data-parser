import BasicPageInfo from "@renderer/common/components/composites/basic-page-info";
import { Database } from "lucide-react";
import { useUserNavInvoices } from "../root/navbar/sidebar.loader";
import AccoutAllTable from "./all-lisitngs-table";
import AllListingsEmpty from "./all-listing-empty";

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
