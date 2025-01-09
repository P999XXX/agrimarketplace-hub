import { LayoutDashboard, Users, Building2, ShoppingCart, Settings } from "lucide-react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
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

export const SidebarNavigation = () => {
  const { state, isMobile } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(href);
  };

  return (
    <div className="space-y-2">
      <h2 className={`px-4 text-sm font-semibold text-muted-foreground uppercase pt-6 transition-opacity duration-200 ${!isMobile && state === "collapsed" ? "opacity-0" : "opacity-100"}`}>
        Menu
      </h2>
      <SidebarMenu>
        <TooltipProvider delayDuration={0} disableHoverableContent>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={(e) => handleClick(e, item.href)}
                      className={`w-full justify-start gap-3 transition-colors min-h-[44px] px-2 py-2.5 rounded-md ${
                        isActive 
                          ? "text-primary bg-primary/10 dark:bg-primary/20" 
                          : "text-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[15px] font-medium transition-all duration-200 ${
                          !isMobile && state === "collapsed" ? "opacity-0 w-0" : "opacity-100"
                        }`}>
                          {item.title}
                        </span>
                      </div>
                    </Button>
                  </TooltipTrigger>
                  {!isMobile && state === "collapsed" && (
                    <TooltipContent side="right" sideOffset={10} className="z-[1200]">
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