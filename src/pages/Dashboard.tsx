import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Users, Building2, File } from "lucide-react";
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
          <StatsCard
            title="Total Products"
            value="0"
            icon={<LayoutDashboard className="h-4 w-4 text-muted-foreground" />}
          />
          
          <StatsCard
            title="Active Certificates"
            value="0"
            icon={<File className="h-4 w-4 text-muted-foreground" />}
          />
          
          <StatsCard
            title="Team Members"
            value="0"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          
          <StatsCard
            title="Companies"
            value="0"
            icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-sm">
              No recent activity to display
            </div>
          </CardContent>
        </Card>
      </DashboardContent>
    </DashboardLayout>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;