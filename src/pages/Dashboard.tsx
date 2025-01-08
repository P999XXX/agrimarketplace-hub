import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Users, ChartBar, Database } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        </div>
        
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Products"
            value="145"
            subtext="+12.5% from last month"
            icon={<Database className="h-5 w-5" />}
          />

          <StatsCard
            title="Active Users"
            value="2,350"
            subtext="+180 new users this week"
            icon={<Users className="h-5 w-5" />}
          />

          <StatsCard
            title="Sales Volume"
            value="$12.5M"
            subtext="+8.2% from last quarter"
            icon={<ChartBar className="h-5 w-5" />}
          />

          <StatsCard
            title="Active Listings"
            value="892"
            subtext="+24 new listings today"
            icon={<LayoutDashboard className="h-5 w-5" />}
          />
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-base font-medium text-gray-900">New order placed</p>
                      <p className="text-sm text-gray-500">
                        Order #12{i}45 - Wheat (Premium Quality)
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      2 hours ago
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className="text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <p className="text-sm text-gray-500 mt-1">
          {subtext}
        </p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;