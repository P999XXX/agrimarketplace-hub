import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const InviteSheetHeader = () => {
  return (
    <div className="p-6">
      <SheetHeader className="text-left">
        <SheetTitle className="text-2xl">Invite Team Member</SheetTitle>
      </SheetHeader>
    </div>
  );
};