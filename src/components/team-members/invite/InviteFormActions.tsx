import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";

interface InviteFormActionsProps {
  isLoading: boolean;
}

export const InviteFormActions = ({ isLoading }: InviteFormActionsProps) => {
  return (
    <div className="space-y-2 pt-2">
      <Button type="submit" className="w-full py-6" disabled={isLoading}>
        {isLoading ? "Sending invitation..." : "Send invitation"}
      </Button>
      <SheetClose asChild>
        <Button type="button" variant="outline" className="w-full py-6">
          Cancel
        </Button>
      </SheetClose>
    </div>
  );
};