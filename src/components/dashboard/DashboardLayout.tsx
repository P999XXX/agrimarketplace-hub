import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarGroup, SidebarGroupContent, useSidebar } from "@/components/ui/sidebar";
import { Logo } from "@/components/auth/Logo";
import { DashboardMenu } from "./DashboardMenu";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const SidebarLogo = () => {
  const { state } = useSidebar();
  
  if (state === "collapsed") {
    return null;
  }
  
  return <Logo />;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        {/* Desktop Sidebar */}
        <Sidebar variant="sidebar" collapsible="icon" className="hidden md:flex border-r transition-colors duration-300 group-data-[state=collapsed]:bg-brand-500">
          <SidebarHeader className="h-16 flex items-center border-b px-4 bg-brand-700">
            <div className="flex items-center justify-between w-full group-data-[state=collapsed]:justify-center h-full">
              <SidebarLogo />
              <div className="flex items-center">
                <SidebarTrigger className="text-white hover:bg-brand-600/50" />
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
          <DashboardHeader />
          <main className="flex-1 bg-gray-50">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};