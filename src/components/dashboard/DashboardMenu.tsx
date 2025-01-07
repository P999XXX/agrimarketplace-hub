import { LayoutDashboard, Users, Building2, ShoppingCart, Settings } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

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

export const DashboardMenu = () => {
  const { state } = useSidebar();
  const location = useLocation();
  
  return (
    <div className="space-y-2">
      <h2 className={`px-4 text-lg font-semibold text-brand-700 pt-6 transition-opacity duration-200 ${state === "collapsed" ? "opacity-0" : "opacity-100"}`}>
        Account
      </h2>
      <SidebarMenu>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a 
                  href={item.href} 
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-300 min-h-[44px] group
                    ${state === "collapsed" 
                      ? "justify-center bg-brand-500 hover:bg-brand-600" 
                      : isActive 
                        ? "text-brand-900 bg-brand-50/50" 
                        : "text-brand-700 hover:text-brand-900 hover:bg-brand-50/50"
                    }`}
                >
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                      state === "collapsed" ? "text-white" : ""
                    }`} />
                  </div>
                  <span className={`text-[15px] font-medium transition-all duration-300 ${
                    state === "collapsed" ? "opacity-0 w-0" : "opacity-100"
                  }`}>
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