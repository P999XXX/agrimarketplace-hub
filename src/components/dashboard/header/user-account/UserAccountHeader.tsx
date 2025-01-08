import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "../../UserAvatar";

interface UserAccountHeaderProps {
  userName: string;
  email?: string;
}

export const UserAccountHeader = ({ userName, email }: UserAccountHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="h-10 w-10">
          <UserAvatar size="large" />
        </div>
        <div className="space-y-1">
          <p className="text-base font-semibold leading-none">
            {userName}
          </p>
          {email && (
            <p className="text-sm text-muted-foreground">
              {email}
            </p>
          )}
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Settings className="h-6 w-6" />
      </Button>
    </div>
  );
};