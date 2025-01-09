import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";

interface CertificateFormFooterProps {
  isLoading: boolean;
}

export const CertificateFormFooter = ({ isLoading }: CertificateFormFooterProps) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
      <SheetClose asChild>
        <Button type="button" variant="outline" className="w-full sm:w-auto">
          Cancel
        </Button>
      </SheetClose>
      <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload Certificate"}
      </Button>
    </div>
  );
};