import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Settings,
  ChevronDown,
  History,
  Star,
  Boxes,
  FileText,
  MessageSquare,
  HelpCircle
} from "lucide-react";
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const platformItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard"
  },
  {
    title: "History",
    icon: History,
    href: "/dashboard/history"
  },
  {
    title: "Starred",
    icon: Star,
    href: "/dashboard/starred"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings"
  }
];

const resourceItems = [
  {
    title: "Products",
    icon: Boxes,
    href: "/dashboard/products"
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
    title: "Documentation",
    icon: FileText,
    href: "/dashboard/documentation"
  }
];

const supportItems = [
  {
    title: "Support",
    icon: HelpCircle,
    href: "/dashboard/support"
  },
  {
    title: "Messages",
    icon: MessageSquare,
    href: "/dashboard/messages"
  }
];

export const DashboardMenu = () => {
  const location = useLocation();
  
  const renderMenuItem = (item: { title: string; icon: any; href: string }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;
    
    return (
      <SidebarMenuItem key={item.href}>
        <SidebarMenuButton
          asChild
          className={`w-full justify-start gap-2 ${
            isActive ? "bg-secondary" : "hover:bg-secondary/50"
          }`}
        >
          <a href={item.href} className="flex items-center">
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <div className="px-2 py-2">
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {platformItems.map(renderMenuItem)}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Resources</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {resourceItems.map(renderMenuItem)}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Support</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {supportItems.map(renderMenuItem)}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
};