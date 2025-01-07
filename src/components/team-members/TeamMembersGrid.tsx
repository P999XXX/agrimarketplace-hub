import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmailCell } from "./EmailCell";

export const TeamMembersGrid = () => {
  const getRoleBadgeClass = () => {
    return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
      case 'inactive':
        return 'bg-red-100 text-red-700 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              JD
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">John Doe</h3>
              <EmailCell email="john@example.com" />
              <div className="mt-2 space-y-1.5">
                <Badge className={getRoleBadgeClass()}>Admin</Badge>
                <div className="block">
                  <Badge className={getStatusBadgeClass('active')}>Active</Badge>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Invited by: Sarah Smith</p>
                  <p>Joined: Jan 15, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};