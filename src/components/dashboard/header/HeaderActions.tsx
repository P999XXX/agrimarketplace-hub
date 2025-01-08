import { Bell } from "lucide-react";
import { UserAvatar } from "../UserAvatar";
import { MobileNav } from "../mobile/MobileNav";
import { HeaderLogo } from "./HeaderLogo";
import { DashboardBreadcrumb } from "./DashboardBreadcrumb";
import { UserAccountPopover } from "./UserAccountPopover";

export const HeaderActions = () => {
  return (
    <header className="h-16 flex items-center justify-between px-4 sticky top-0 z-50 dark:bg-black bg-white border-b border-border/50">
      <div className="flex items-center gap-1.2">
        <MobileNav />
        <HeaderLogo />
        <DashboardBreadcrumb />
      </div>
      <div className="flex items-center gap-3">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <UserAccountPopover>
          <UserAvatar />
        </UserAccountPopover>
      </div>
    </header>
  );
};