import { Button } from "@/components/ui/button";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";

interface InviteFormFooterProps {
  isLoading: boolean;
}

export const InviteFormFooter = ({ isLoading }: InviteFormFooterProps) => {
  return (
    <div className="p-5">
      <SheetFooter className="flex flex-col-reverse sm:flex-row sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
        <SheetClose asChild>
          <Button type="button" variant="outline" className="w-full sm:w-auto">
            Cancel
          </Button>
        </SheetClose>
        <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
          {isLoading ? "Sending invitation..." : "Send invitation"}
        </Button>
      </SheetFooter>
    </div>
  );
};