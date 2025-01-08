import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { DashboardMenu } from "./DashboardMenu";
import { CustomSidebarTrigger } from "./CustomSidebarTrigger";
import { DashboardBreadcrumb } from "./DashboardBreadcrumb";
import { HeaderLogo } from "./HeaderLogo";
import { SidebarLogo } from "./SidebarLogo";
import { MobileNav } from "./MobileNav";
import { UserAvatar } from "./UserAvatar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const defaultOpen = localStorage.getItem('sidebarState') === 'expanded';

  useEffect(() => {
    const handleSidebarChange = (state: 'expanded' | 'collapsed') => {
      localStorage.setItem('sidebarState', state);
    };

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

  useEffect(() => {
    const currentPath = location.pathname;
    const lastPath = localStorage.getItem('lastPath');
    
    if (lastPath && lastPath !== currentPath) {
      const sidebar = document.querySelector('[data-state]');
      if (sidebar) {
        sidebar.setAttribute('data-state', 'collapsed');
      }
    }
    
    localStorage.setItem('lastPath', currentPath);
  }, [location.pathname]);

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen w-full">
        <Sidebar variant="sidebar" collapsible="icon" className="hidden md:flex border-r border-border/50">
          <SidebarHeader className="h-16 flex items-center border-b border-border/50 px-4">
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
          <header className="h-16 flex items-center justify-between px-4 sticky top-0 z-50 dark:bg-black/10 bg-white/70 backdrop-blur-sm border-b border-border/50">
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