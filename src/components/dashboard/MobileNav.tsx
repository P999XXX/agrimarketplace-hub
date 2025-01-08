import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Logo } from "@/components/auth/Logo";
import { SidebarContent, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { DashboardMenu } from "./DashboardMenu";

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent w-fit md:hidden">
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 bg-white">
        <div className="flex h-full flex-col">
          <div className="h-16 flex items-center justify-between border-b p-4 bg-white">
            <Logo />
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              </Button>
            </SheetClose>
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