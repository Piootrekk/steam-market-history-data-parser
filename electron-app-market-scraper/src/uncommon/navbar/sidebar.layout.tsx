import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { ScrollArea } from "src/common/components/primitives/scroll-area";
import BasicPageWrapper from "src/common/components/composites/base-page-wrapper";

const LeftNavLayout = () => {
  return (
    <div className="h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 overflow-auto">
          <BasicPageWrapper>
            <ScrollArea className="space-y-6 flex flex-col pr-2">
              <Outlet />
            </ScrollArea>
          </BasicPageWrapper>
        </main>
      </div>
    </div>
  );
};

export default LeftNavLayout;
