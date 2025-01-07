import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Users, ChartBar, LayoutDashboard } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
}

const StatCard = ({ title, value, change, icon: Icon }: StatCardProps) => (
  <Card className="card-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-brand-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-brand-900">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);

export const DashboardStats = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Products"
        value="145"
        change="+12.5% from last month"
        icon={Database}
      />
      <StatCard
        title="Active Users"
        value="2,350"
        change="+180 new users this week"
        icon={Users}
      />
      <StatCard
        title="Sales Volume"
        value="$12.5M"
        change="+8.2% from last quarter"
        icon={ChartBar}
      />
      <StatCard
        title="Active Listings"
        value="892"
        change="+24 new listings today"
        icon={LayoutDashboard}
      />
    </div>
  );
};