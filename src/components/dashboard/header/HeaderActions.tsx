import { UserAvatar } from "../UserAvatar";
import { MobileNav } from "../mobile/MobileNav";
import { HeaderLogo } from "./HeaderLogo";
import { DashboardBreadcrumb } from "./DashboardBreadcrumb";

export const HeaderActions = () => {
  return (
    <header className="h-16 flex items-center justify-between px-4 sticky top-0 z-50 dark:bg-black bg-white border-b border-border/50">
      <div className="flex items-center gap-1.5">
        <MobileNav />
        <HeaderLogo />
        <DashboardBreadcrumb />
      </div>
      <UserAvatar />
    </header>
  );
};