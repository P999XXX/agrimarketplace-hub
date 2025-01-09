import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CertificateUploadDialog } from "../upload/CertificateUploadDialog";

export const CertificatesHeader = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold tracking-tight">Certificates</h1>
      <div className="flex items-center gap-4">
        <Button onClick={() => setIsUploadOpen(true)} className="hidden md:flex">
          <Plus className="mr-2 h-4 w-4" />
          Upload Certificate
        </Button>
      </div>
      <CertificateUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
      />
    </div>
  );
};