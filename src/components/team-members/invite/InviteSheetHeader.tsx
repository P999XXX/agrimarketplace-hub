import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const InviteSheetHeader = () => {
  return (
    <div className="border-b">
      <SheetHeader className="p-5 text-left">
        <SheetTitle className="text-2xl">Invite Team Member</SheetTitle>
      </SheetHeader>
    </div>
  );
};