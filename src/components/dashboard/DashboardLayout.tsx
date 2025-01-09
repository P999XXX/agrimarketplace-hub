import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarState } from "@/hooks/use-sidebar-state";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isOpen } = useSidebarState();

  return (
    <SidebarProvider defaultOpen={isOpen}>
      <div className="min-h-screen flex w-full">
        {children}
      </div>
    </SidebarProvider>
  );
};