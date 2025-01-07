import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { DashboardMenu } from "./DashboardMenu";
import { CustomSidebarTrigger } from "./CustomSidebarTrigger";
import { DashboardBreadcrumb } from "./DashboardBreadcrumb";
import { HeaderLogo } from "./HeaderLogo";
import { SidebarLogo } from "./SidebarLogo";
import { MobileNav } from "./MobileNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const defaultOpen = localStorage.getItem('sidebarState') === 'expanded';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        {/* Desktop Sidebar */}
        <Sidebar variant="sidebar" collapsible="icon" className="hidden md:flex bg-white border-r fixed h-full">
          <SidebarHeader className="h-16 flex items-center border-b px-4 bg-brand-700">
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
        <div className="flex w-full flex-col md:ml-[var(--sidebar-width)] transition-[margin] duration-200 ease-in-out">
          <header className="h-16 flex items-center justify-between border-b bg-brand-700 px-4 sticky top-0 z-50 shadow-sm">
            <div className="flex items-center gap-3">
              <MobileNav />
              <HeaderLogo />
              <DashboardBreadcrumb />
            </div>
          </header>
          <main className="flex-1 bg-gray-50">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};