import RootPageWrapper from "@renderer/common/components/composites/base-page-wrapper";
import { ScrollArea } from "@renderer/common/components/primitives/scroll-area";
import { Outlet } from "react-router-dom";
import Sidebar from "./navbar/sidebar";

const RootWithNavLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-auto p-8">
          <RootPageWrapper>
            <ScrollArea
              direction="vertical"
              className="flex flex-col space-y-6 pr-2"
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
