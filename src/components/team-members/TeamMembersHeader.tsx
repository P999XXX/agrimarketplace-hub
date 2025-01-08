import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { InviteMemberForm } from "./InviteMemberForm";
import { Dispatch, SetStateAction } from "react";

interface TeamMembersHeaderProps {
  view: "grid" | "table";
  onViewChange: Dispatch<SetStateAction<"grid" | "table">>;
}

export const TeamMembersHeader = ({ view, onViewChange }: TeamMembersHeaderProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Team Members
        </h1>
        <div className="hidden md:block">
          <Sheet>
            <SheetTrigger asChild>
              <Button>
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
      </div>

      {/* Mobile Sticky Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-background/80 supports-[backdrop-filter]:bg-background/60 border-t border-border z-50">
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
    </>
  );
};