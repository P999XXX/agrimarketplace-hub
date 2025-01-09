import { ReactNode } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CommonFormSheetProps {
  title: string;
  children: ReactNode;
  triggerButtonText: string;
  className?: string;
}

export const CommonFormSheet = ({ 
  title, 
  children, 
  triggerButtonText,
  className = "w-full sm:max-w-lg"
}: CommonFormSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-[#00875A] hover:bg-[#006644]">
          <Plus className="h-4 w-4 mr-2" />
          {triggerButtonText}
        </Button>
      </SheetTrigger>
      <SheetContent className={className}>
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl">{title}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};