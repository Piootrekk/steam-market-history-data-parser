import { Database } from "lucide-react";
import BasicPageInfo from "src/common/components/composites/basic-page-info";
import AccoutAllTable from "./account-all-table";

const AccountAllPage = () => {
  return (
    <>
      <BasicPageInfo
        name={"All your saved listings from DB."}
        desc={`Display, search whole listings in table.`}
        Icon={Database}
      />
      <AccoutAllTable />
    </>
  );
};

export default AccountAllPage;
