import BasicPageInfo from "@renderer/common/components/composites/basic-page-info";
import { LayoutDashboard } from "lucide-react";

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
