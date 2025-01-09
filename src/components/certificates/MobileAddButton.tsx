import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CommonFormSheet } from "@/components/common/sheet/CommonFormSheet";

export const MobileAddButton = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 dark:bg-black/10 bg-white/70 backdrop-blur-sm border-t border-border/50 z-50">
      <CommonFormSheet
        title="Add New Certificate"
        triggerButtonText="Add Certificate"
      >
        {/* Certificate form will be added here */}
      </CommonFormSheet>
    </div>
  );
};
