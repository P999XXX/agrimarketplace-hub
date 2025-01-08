import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup } from "@/components/ui/sidebar";
import { DashboardMenu } from "./DashboardMenu";
import { UserNav } from "./UserNav";
import { Logo } from "@/components/auth/Logo";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean);
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50/50">
        <Sidebar variant="inset" className="border-none">
          <SidebarHeader className="border-none px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <Logo className="w-6 h-6" />
              </div>
              <div className="grid gap-0.5">
                <h3 className="text-sm font-medium">Cropio Inc</h3>
                <p className="text-xs text-muted-foreground">Enterprise</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <DashboardMenu />
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {path.length > 1 && (
                  <BreadcrumbItem>
                    <BreadcrumbPage className="capitalize">
                      {path[1].replace('-', ' ')}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
              <UserNav />
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};