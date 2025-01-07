import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { DashboardMenu } from "./DashboardMenu";
import { CustomSidebarTrigger } from "./CustomSidebarTrigger";
import { DashboardBreadcrumb } from "./DashboardBreadcrumb";
import { HeaderLogo } from "./HeaderLogo";
import { SidebarLogo } from "./SidebarLogo";
import { MobileNav } from "./MobileNav";
import { UserAvatar } from "./UserAvatar";
import { ThemeToggle } from "./ThemeToggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const defaultOpen = localStorage.getItem('sidebarState') === 'expanded';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen w-full">
        {/* Desktop Sidebar */}
        <Sidebar variant="sidebar" collapsible="icon" className="hidden md:flex bg-white border-r dark:bg-dark-100 dark:border-dark-300">
          <SidebarHeader className="h-16 flex items-center border-b px-4 bg-white shadow-sm dark:bg-dark-100 dark:border-dark-300">
            <div className="flex items-center justify-between w-full group-data-[state=collapsed]:justify-center h-full">
              <SidebarLogo />
              <div className="flex items-center">
                <CustomSidebarTrigger />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <DashboardMenu />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex w-full flex-col">
          <header className="h-16 flex items-center justify-between border-b bg-white px-4 sticky top-0 z-50 shadow-sm dark:bg-dark-100 dark:border-dark-300">
            <div className="flex items-center gap-3">
              <MobileNav />
              <HeaderLogo />
              <DashboardBreadcrumb />
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <UserAvatar />
            </div>
          </header>
          <main className="flex-1 bg-gray-50 dark:bg-dark-200">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};