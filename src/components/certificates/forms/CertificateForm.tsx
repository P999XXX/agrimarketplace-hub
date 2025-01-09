import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetClose } from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { useCertificateCategoriesQuery } from "@/hooks/certificates/useCertificateCategoriesQuery";
import { CommonAvatar } from "@/components/common/avatar/CommonAvatar";
import { getInitials, getColorScheme } from "@/utils/colorSchemes";
import { cn } from "@/lib/utils";

export const CertificateForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [issueDate, setIssueDate] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [categoryId, setCategoryId] = useState<string>("");
  const { data: categories, isLoading } = useCertificateCategoriesQuery();

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
          <div className="space-y-1">
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a certificate category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem 
                    key={category.id} 
                    value={category.id}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex items-center space-x-3">
                      <CommonAvatar 
                        initials={getInitials(category.name, '')}
                        colorScheme={getColorScheme(category.name)}
                        size="sm"
                      />
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="issueDate">Issue Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal",
                    !issueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {issueDate ? format(issueDate, "PPP") : "Select issue date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={issueDate}
                  onSelect={setIssueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-1">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal",
                    !expiryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expiryDate ? format(expiryDate, "PPP") : "Select expiry date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={setExpiryDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-1">
            <Label htmlFor="file">Certificate File (PDF, max 10MB)</Label>
            <div className="mt-2">
              <label
                htmlFor="file-upload"
                className="flex justify-center rounded-lg border border-dashed border-border px-6 py-10 cursor-pointer hover:border-primary/50 transition-colors"
              >
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                    <span className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary">
                      {selectedFile ? selectedFile.name : "Upload a file"}
                    </span>
                  </div>
                </div>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept=".pdf"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 mt-6 bg-background pt-4 border-t px-2">
        <div className="flex flex-col-reverse sm:flex-row sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
          <SheetClose asChild>
            <Button type="button" variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </SheetClose>
          <Button type="submit" className="w-full sm:w-auto">
            Upload Certificate
          </Button>
        </div>
      </div>
    </form>
  );
};