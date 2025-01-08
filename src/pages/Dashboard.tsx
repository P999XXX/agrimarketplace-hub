import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Users, ChartBar, Database } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardContent>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Dashboard Overview
          </h1>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Products"
            value="145"
            subtext="+12.5% from last month"
            icon={<Database className="h-4 w-4 text-muted-foreground" />}
          />

          <StatsCard
            title="Active Users"
            value="2,350"
            subtext="+180 new users this week"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />

          <StatsCard
            title="Sales Volume"
            value="$12.5M"
            subtext="+8.2% from last quarter"
            icon={<ChartBar className="h-4 w-4 text-muted-foreground" />}
          />

          <StatsCard
            title="Active Listings"
            value="892"
            subtext="+24 new listings today"
            icon={<LayoutDashboard className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">New order placed</p>
                    <p className="text-sm text-muted-foreground">
                      Order #12{i}45 - Wheat (Premium Quality)
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    2 hours ago
                  </span>
                </div>
              ))}
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
  subtext: string;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, subtext, icon }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {subtext}
        </p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;