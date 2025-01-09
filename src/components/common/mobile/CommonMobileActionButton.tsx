import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { ReactNode } from "react";

interface CommonMobileActionButtonProps {
  title: string;
  buttonText: string;
  children: ReactNode;
}

export const CommonMobileActionButton = ({
  title,
  buttonText,
  children
}: CommonMobileActionButtonProps) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 dark:bg-black/10 bg-white/70 backdrop-blur-sm border-t border-border/50 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            {buttonText}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader className="text-left">
            <SheetTitle className="text-2xl">{title}</SheetTitle>
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
};