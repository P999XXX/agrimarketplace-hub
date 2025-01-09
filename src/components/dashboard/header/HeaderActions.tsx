import { MessageSquare, Bell } from "lucide-react";
import { HeaderLogo } from "./HeaderLogo";
import { UserAccountPopover } from "./UserAccountPopover";
import { DashboardBreadcrumb } from "../DashboardBreadcrumb";

export const HeaderActions = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-6">
        <HeaderLogo />
        <DashboardBreadcrumb />
      </div>
      <div className="flex items-center gap-6">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <MessageSquare className="h-5 w-5" />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <UserAccountPopover />
      </div>
    </div>
  );
};