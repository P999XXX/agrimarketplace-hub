import { useState } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CertificateFormFields } from "./CertificateFormFields";
import { CertificateFormFooter } from "./CertificateFormFooter";
import { useCertificateCategoriesQuery } from "@/hooks/certificates/useCertificateCategoriesQuery";
import { useToast } from "@/hooks/use-toast";

export const CertificateForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [issueDate, setIssueDate] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [categoryId, setCategoryId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: categories } = useCertificateCategoriesQuery();
  const { toast } = useToast();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size should not exceed 10MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = [];

    if (!categoryId) {
      validationErrors.push("Please select a certificate category");
    }

    if (!issueDate) {
      validationErrors.push("Please select an issue date");
    }

    if (!expiryDate) {
      validationErrors.push("Please select an expiry date");
    }

    if (!selectedFile) {
      validationErrors.push("Please upload a certificate file");
    }

    if (validationErrors.length > 0) {
      toast({
        title: "Form validation failed",
        description: validationErrors[0],
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement form submission
      console.log("Form submitted with:", {
        categoryId,
        issueDate,
        expiryDate,
        selectedFile
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload certificate",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <CertificateFormFooter isLoading={isSubmitting} />
      </div>
      <SheetClose className="hidden" />
    </form>
  );
};