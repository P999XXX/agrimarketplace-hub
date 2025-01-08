import { ReactNode } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardMenu } from "./DashboardMenu";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarHeader } from "@/components/ui/sidebar";
import { MobileNav } from "./MobileNav";
import { HeaderLogo } from "./HeaderLogo";
import { UserAvatar } from "./UserAvatar";
import { DashboardBreadcrumb } from "./DashboardBreadcrumb";

interface DashboardLayoutProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

export const DashboardLayout = ({
  children,
  defaultOpen = true,
}: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen w-full">
        <Sidebar variant="sidebar" collapsible="icon" className="hidden md:flex border-r border-border">
          <SidebarHeader className="h-16 flex items-center border-b border-border px-4">
            <div className="flex items-center justify-between w-full group-data-[state=collapsed]:justify-center h-full">
              <SidebarLogo />
            </div>
          </SidebarHeader>
          <DashboardMenu />
        </Sidebar>

        <div className="flex w-full flex-col">
          <header className="h-16 flex items-center justify-between border-b border-border px-4 sticky top-0 z-50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <MobileNav />
              <HeaderLogo />
              <DashboardBreadcrumb />
            </div>
            <UserAvatar />
          </header>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};