import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { InviteMemberForm } from "./InviteMemberForm";
import { Separator } from "@/components/ui/separator";

export const TeamMembersHeader = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Team Members
        </h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="hidden md:inline-flex bg-[rgb(0,128,96,0.9)] text-white hover:bg-[rgb(0,128,96,0.8)]">
              <Plus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:w-[450px] sm:max-w-full h-full">
            <SheetHeader>
              <SheetTitle className="text-2xl">Invite Team Member</SheetTitle>
            </SheetHeader>
            <InviteMemberForm />
          </SheetContent>
        </Sheet>
      </div>
      <Separator className="w-full" />
    </div>
  );
};