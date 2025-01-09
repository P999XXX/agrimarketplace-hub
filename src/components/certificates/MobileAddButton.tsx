import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const MobileAddButton = () => {
  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-white/70 dark:bg-black/10 backdrop-blur-md px-4 py-4 rounded-lg shadow-lg">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full bg-[#00875A] hover:bg-[#006644]">
              <Plus className="h-4 w-4 mr-2" />
              Add Certificate
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[96%]">
            <SheetHeader>
              <SheetTitle>Add New Certificate</SheetTitle>
            </SheetHeader>
            {/* Certificate form will be added here */}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};