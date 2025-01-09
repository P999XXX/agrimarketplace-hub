import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const InviteSheetHeader = () => {
  return (
    <div className="px-2 mb-8">
      <SheetHeader className="text-left">
        <SheetTitle className="text-2xl">Invite Team Member</SheetTitle>
      </SheetHeader>
    </div>
  );
};