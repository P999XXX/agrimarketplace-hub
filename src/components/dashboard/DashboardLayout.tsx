import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Logo } from "@/components/auth/Logo";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
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

const SidebarToggle = () => {
  const { state } = useSidebar();
  return (
    <button 
      onClick={() => {
        const trigger = document.querySelector('[data-sidebar="trigger"]') as HTMLElement;
        if (trigger) trigger.click();
      }} 
      className="flex items-center justify-center w-8 h-8 text-white rounded-md hover:bg-white/10 transition-colors focus:outline-none"
    >
      {state === "expanded" ? (
        <PanelLeftClose size={20} />
      ) : (
        <PanelLeftOpen size={20} />
      )}
    </button>
  );
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        {/* Desktop Sidebar */}
        <Sidebar variant="sidebar" collapsible="icon" className="hidden md:flex bg-white border-r">
          <SidebarHeader className="h-16 flex items-center border-b px-4 bg-brand-700">
            <div className="flex items-center justify-between w-full group-data-[state=collapsed]:justify-center h-full">
              <SidebarLogo />
              <div className="flex items-center">
                <SidebarToggle />
                <SidebarTrigger className="hidden" />
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