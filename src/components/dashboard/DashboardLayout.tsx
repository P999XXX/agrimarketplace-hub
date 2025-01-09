import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { CustomSidebarTrigger } from "./CustomSidebarTrigger";
import { SidebarLogo } from "./SidebarLogo";
import { HeaderActions } from "./header/HeaderActions";
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
                <SidebarNavigation />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex w-full flex-col z-0">
          <HeaderActions />
          <main className="flex-1 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};