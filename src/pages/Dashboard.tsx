import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Dashboard Overview
          </h1>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold">Active Certificates</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold">Team Members</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-lg font-semibold">Companies</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
};

export default Dashboard;