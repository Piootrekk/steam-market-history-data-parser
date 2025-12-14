import { LayoutDashboard } from "lucide-react";
import BasicPageWrapper from "src/common/components/composites/base-page-wrapper";
import BasicPageInfo from "src/common/components/composites/basic-page-info";

const DashboardPage = () => {
  return (
    <BasicPageWrapper>
      <BasicPageInfo
        name={"Dashboard"}
        desc={"Welcome back! Here's what's happening with your business today."}
        Icon={LayoutDashboard}
      />
    </BasicPageWrapper>
  );
};

export default DashboardPage;
