import { useState } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CertificateFormFields } from "./CertificateFormFields";
import { CertificateFormFooter } from "./CertificateFormFooter";
import { useCertificateCategoriesQuery } from "@/hooks/certificates/useCertificateCategoriesQuery";

export const CertificateForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [issueDate, setIssueDate] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [categoryId, setCategoryId] = useState<string>("");
  const { data: categories } = useCertificateCategoriesQuery();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        // TODO: Show error toast
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        // TODO: Show error toast
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full max-h-[calc(100vh-8rem)] pt-6">
      <ScrollArea className="flex-1">
        <div className="space-y-4 px-2">
          <CertificateFormFields
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            categories={categories}
            issueDate={issueDate}
            setIssueDate={setIssueDate}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            selectedFile={selectedFile}
            handleFileChange={handleFileChange}
          />
        </div>
      </ScrollArea>
      <div className="sticky bottom-0 mt-6 bg-background pt-4 border-t px-2">
        <CertificateFormFooter isLoading={false} />
      </div>
      <SheetClose className="hidden" />
    </form>
  );
};