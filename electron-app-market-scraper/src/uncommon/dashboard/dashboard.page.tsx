import { LayoutDashboard } from "lucide-react";
import BasicPageInfo from "src/common/components/composites/basic-page-info";

const DashboardPage = () => {
  return (
    <BasicPageInfo
      name={"Dashboard"}
      desc={"Welcome back! Here's what's happening with your business today."}
      Icon={LayoutDashboard}
    />
  );
};

export default DashboardPage;
