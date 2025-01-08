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
    <div className="flex justify-between items-center mb-6">
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
  );
};