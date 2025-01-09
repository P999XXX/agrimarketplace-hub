import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CertificateUploadDialog } from "./upload/CertificateUploadDialog";

export const MobileAddButton = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border/50 z-50">
        <Button 
          className="w-full" 
          onClick={() => setIsUploadOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Upload Certificate
        </Button>
      </div>
      <CertificateUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
      />
    </>
  );
};