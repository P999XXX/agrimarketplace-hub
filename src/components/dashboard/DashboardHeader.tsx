import { Logo } from "@/components/auth/Logo";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import { DashboardMenu } from "./DashboardMenu";

const CustomSidebarTrigger = () => {
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

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent w-fit md:hidden">
          <PanelLeftOpen size={20} className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-white">
        <div className="flex h-full flex-col">
          <div className="h-16 flex items-center justify-between border-b p-4 bg-brand-700">
            <Logo />
          </div>
          <DashboardMenu />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const HeaderLogo = () => {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  
  if (!isMobile && state === "expanded") {
    return null;
  }
  
  return <Logo />;
};

const DashboardBreadcrumb = () => {
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean);
  
  return (
    <Breadcrumb className="ml-6 hidden md:block">
      <BreadcrumbList className="text-white/90 text-base">
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard" className="text-white hover:text-white/80 font-medium">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        {path.length > 1 && (
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize text-white/90 font-medium">
              {path[1].replace('-', ' ')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const DashboardHeader = () => {
  return (
    <header className="h-16 flex items-center justify-between border-b bg-brand-700 px-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-3">
        <MobileNav />
        <HeaderLogo />
        <DashboardBreadcrumb />
      </div>
    </header>
  );
};