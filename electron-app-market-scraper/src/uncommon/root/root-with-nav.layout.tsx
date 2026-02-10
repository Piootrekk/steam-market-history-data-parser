import { Outlet } from "react-router-dom";
import Sidebar from "./navbar/sidebar";
import { ScrollArea } from "src/common/components/primitives/scroll-area";
import RootPageWrapper from "src/common/components/composites/base-page-wrapper";

const RootWithNavLayout = () => {
  return (
    <div className="h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 overflow-auto">
          <RootPageWrapper>
            <ScrollArea
              direction="vertical"
              className="space-y-6 flex flex-col pr-2"
            >
              <Outlet />
            </ScrollArea>
          </RootPageWrapper>
        </main>
      </div>
    </div>
  );
};

export default RootWithNavLayout;
