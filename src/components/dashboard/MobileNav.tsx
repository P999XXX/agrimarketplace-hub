import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/auth/Logo";
import { SidebarContent, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { DashboardMenu } from "./DashboardMenu";

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="p-2 h-auto w-auto hover:bg-transparent md:hidden"
        >
          <PanelLeftOpen className="w-5 h-5 text-gray-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-white">
        <div className="flex h-full flex-col">
          <div className="h-16 flex items-center justify-between border-b p-4 bg-white">
            <Logo />
            <Button 
              variant="ghost" 
              size="icon" 
              className="p-2 h-auto w-auto hover:bg-transparent"
            >
              <PanelLeftClose className="w-5 h-5 text-gray-500" />
            </Button>
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