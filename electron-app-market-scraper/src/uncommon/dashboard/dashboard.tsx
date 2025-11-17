import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <LayoutDashboard className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        </div>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
