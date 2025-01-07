import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityItem {
  id: number;
  title: string;
  description: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    title: "New order placed",
    description: "Order #1245 - Wheat (Premium Quality)",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "New order placed",
    description: "Order #1246 - Wheat (Premium Quality)",
    time: "2 hours ago"
  },
  {
    id: 3,
    title: "New order placed",
    description: "Order #1247 - Wheat (Premium Quality)",
    time: "2 hours ago"
  }
];

export const RecentActivity = () => {
  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};