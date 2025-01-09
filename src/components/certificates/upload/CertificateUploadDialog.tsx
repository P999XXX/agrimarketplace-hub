import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CertificateUploadForm } from "./CertificateUploadForm";

interface CertificateUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CertificateUploadDialog = ({
  open,
  onOpenChange,
}: CertificateUploadDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload New Certificate</DialogTitle>
        </DialogHeader>
        <CertificateUploadForm
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};