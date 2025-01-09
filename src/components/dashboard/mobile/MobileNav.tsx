import { EllipsisVertical, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Logo } from "@/components/auth/Logo";
import { SidebarContent, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { SidebarNavigation } from "../sidebar/SidebarNavigation";

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent w-fit md:hidden">
          <EllipsisVertical className="h-5 w-5 text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex h-full flex-col">
          <div className="h-16 flex items-center justify-between border-b border-border p-4">
            <Logo />
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                <ChevronLeft className="h-5 w-5 text-muted-foreground" />
              </Button>
            </SheetClose>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarNavigation />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>
      </SheetContent>
    </Sheet>
  );
};