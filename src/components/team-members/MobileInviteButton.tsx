import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { InviteMemberForm } from "./InviteMemberForm";

export const MobileInviteButton = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/10 backdrop-blur-sm border-t border-border/50 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader className="text-left">
            <SheetTitle className="text-2xl">Invite Team Member</SheetTitle>
          </SheetHeader>
          <InviteMemberForm />
        </SheetContent>
      </Sheet>
    </div>
  );
};