import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Users, ChartBar, Database } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-brand-100">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-brand-900">Dashboard</h1>
            <Button variant="outline">Sign out</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products
              </CardTitle>
              <Database className="h-4 w-4 text-brand-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-900">145</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-brand-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-900">2,350</div>
              <p className="text-xs text-muted-foreground">
                +180 new users this week
              </p>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Sales Volume
              </CardTitle>
              <ChartBar className="h-4 w-4 text-brand-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-900">$12.5M</div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last quarter
              </p>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Listings
              </CardTitle>
              <LayoutDashboard className="h-4 w-4 text-brand-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-900">892</div>
              <p className="text-xs text-muted-foreground">
                +24 new listings today
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">New order placed</p>
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;