import RootPageWrapper from "@renderer/common/components/composites/base-page-wrapper";
import { ScrollArea } from "@renderer/common/components/primitives/scroll-area";
import { Outlet } from "react-router-dom";
import Sidebar from "./navbar/sidebar";

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
