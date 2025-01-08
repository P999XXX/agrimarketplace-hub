import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { DashboardMenu } from "./DashboardMenu";
import { CustomSidebarTrigger } from "./CustomSidebarTrigger";
import { DashboardBreadcrumb } from "./DashboardBreadcrumb";
import { HeaderLogo } from "./HeaderLogo";
import { SidebarLogo } from "./SidebarLogo";
import { MobileNav } from "./MobileNav";
import { UserAvatar } from "./UserAvatar";
import { useEffect } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const defaultOpen = localStorage.getItem('sidebarState') === 'expanded';

  useEffect(() => {
    const handleSidebarChange = (state: 'expanded' | 'collapsed') => {
      localStorage.setItem('sidebarState', state);
    };

    // Event listener für Sidebar-Änderungen
    const sidebar = document.querySelector('[data-state]');
    if (sidebar) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'data-state') {
            const state = sidebar.getAttribute('data-state');
            if (state === 'expanded' || state === 'collapsed') {
              handleSidebarChange(state);
            }
          }
        });
      });

      observer.observe(sidebar, { attributes: true });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar variant="sidebar" collapsible="icon" className="hidden md:flex bg-white border-r">
          <SidebarHeader className="h-16 flex items-center border-b px-4 bg-white">
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

        <div className="flex w-full flex-col">
          <header className="h-16 flex items-center justify-between border-b bg-white px-4 sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <MobileNav />
              <HeaderLogo />
              <DashboardBreadcrumb />
            </div>
            <UserAvatar />
          </header>
          <main className="flex-1 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};