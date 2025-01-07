import { LayoutDashboard, Users, Building2, ShoppingCart, Settings } from "lucide-react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard"
  },
  {
    title: "Team Members",
    icon: Users,
    href: "/dashboard/team-members"
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

export const DashboardMenu = () => {
  const { state, isMobile } = useSidebar();
  const location = useLocation();
  
  return (
    <div className="space-y-2">
      <h2 className={`px-4 text-sm font-medium text-gray-400 uppercase pt-6 transition-opacity duration-200 ${!isMobile && state === "collapsed" ? "opacity-0" : "opacity-100"}`}>
        Menu
      </h2>
      <SidebarMenu>
        <TooltipProvider delayDuration={0}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="ghost"
                      className={`w-full justify-start gap-3 transition-colors min-h-[44px] ${
                        !isMobile && state === "collapsed" ? "px-[5px]" : "px-4"
                      } py-2.5 rounded-md ${
                        isActive 
                          ? "text-brand-900 bg-brand-50/50" 
                          : "text-brand-700 hover:text-brand-900 hover:bg-brand-50/50"
                      }`}
                    >
                      <a href={item.href}>
                        <div className="flex items-center gap-3">
                          <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-200 ${
                            !isMobile && state === "collapsed" ? "w-full" : ""
                          }`}>
                            <item.icon className={`w-5 h-5 transition-all duration-200 ${
                              !isMobile && state === "collapsed" ? "w-5 h-5" : "w-5 h-5"
                            }`} />
                          </div>
                          <span className={`text-[15px] font-medium transition-all duration-200 ${
                            !isMobile && state === "collapsed" ? "opacity-0 w-0" : "opacity-100"
                          }`}>
                            {item.title}
                          </span>
                        </div>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  {!isMobile && state === "collapsed" && (
                    <TooltipContent side="right">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              </SidebarMenuItem>
            );
          })}
        </TooltipProvider>
      </SidebarMenu>
    </div>
  );
};