import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CertificateForm } from "./forms/CertificateForm";

export const MobileAddButton = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 dark:bg-black/10 bg-white/70 backdrop-blur-sm border-t border-border/50 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-full bg-[#00875A] hover:bg-[#006644]">
            <Plus className="h-4 w-4 mr-2" />
            Add Certificate
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] p-6">
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="text-2xl">Add New Certificate</SheetTitle>
          </SheetHeader>
          <CertificateForm />
        </SheetContent>
      </Sheet>
    </div>
  );
};