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
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Team Members
      </h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <Plus className="h-4 w-4" />
            Invite Member
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Invite Team Member</SheetTitle>
          </SheetHeader>
          <InviteMemberForm />
        </SheetContent>
      </Sheet>
    </div>
  );
};