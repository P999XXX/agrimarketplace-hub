import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Logo } from "@/components/auth/Logo";
import { LayoutDashboard, Users, Building2, ShoppingCart, Settings, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard"
  },
  {
    title: "Users",
    icon: Users,
    href: "/dashboard/users"
  },
  {
    title: "Companies",
    icon: Building2,
    href: "/dashboard/companies"
  },
  {
    title: "Products",
    icon: ShoppingCart,
    href: "/dashboard/products"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings"
  }
];

const DashboardMenu = () => {
  const { state } = useSidebar();
  const location = useLocation();
  
  return (
    <div className="space-y-2">
      <h2 className={`px-4 text-lg font-semibold text-brand-700 pt-6 transition-opacity duration-200 ${state === "collapsed" ? "opacity-0" : "opacity-100"}`}>Account</h2>
      <SidebarMenu>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a 
                  href={item.href} 
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors min-h-[44px] ${
                    state === "collapsed" 
                      ? "text-brand-700" 
                      : isActive 
                        ? "text-brand-900 bg-brand-50/50" 
                        : "text-brand-700 hover:text-brand-900 hover:bg-brand-50/50"
                  }`}
                >
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[15px] font-medium transition-opacity duration-200 ${state === "collapsed" ? "opacity-0" : "opacity-100"}`}>
                    {item.title}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </div>
  );
};

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
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <DashboardMenu />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
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

const SidebarLogo = () => {
  const { state } = useSidebar();
  
  if (state === "collapsed") {
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
                <CustomSidebarTrigger />
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