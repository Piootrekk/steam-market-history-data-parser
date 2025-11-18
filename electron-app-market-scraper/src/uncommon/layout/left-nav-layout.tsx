import { Outlet } from "react-router-dom";
import Sidebar from "../navbar/sidebar";

const LeftNavLayout = () => {
  return (
    <div className="h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LeftNavLayout;
