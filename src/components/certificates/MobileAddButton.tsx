import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MobileAddButton = () => {
  return (
    <div className="md:hidden fixed bottom-6 right-6">
      <Button size="lg" className="rounded-full w-12 h-12 p-0">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};