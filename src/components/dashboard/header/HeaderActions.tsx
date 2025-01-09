import { Bell, MessageSquare, Bot } from "lucide-react";
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
      <div className="flex items-center gap-4">
        <button className="text-primary/50 hover:text-primary transition-colors -mt-0.5">
          <Bot className="h-6 w-6" />
        </button>
        <button className="text-primary/60 hover:text-primary transition-colors">
          <MessageSquare className="h-5 w-5" />
        </button>
        <button className="text-primary/70 hover:text-primary transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <UserAccountPopover>
          <UserAvatar />
        </UserAccountPopover>
      </div>
    </header>
  );
};