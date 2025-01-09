import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { CommonAvatar } from "@/components/common/avatar/CommonAvatar";
import { getInitials, getColorScheme } from "@/utils/colorSchemes";
import { cn } from "@/lib/utils";
import { CertificateCategory } from "@/components/certificates/types";

interface CertificateFormFieldsProps {
  categoryId: string;
  setCategoryId: (value: string) => void;
  categories: CertificateCategory[] | undefined;
  issueDate: Date | undefined;
  setIssueDate: (date: Date | undefined) => void;
  expiryDate: Date | undefined;
  setExpiryDate: (date: Date | undefined) => void;
  selectedFile: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CertificateFormFields = ({
  categoryId,
  setCategoryId,
  categories,
  issueDate,
  setIssueDate,
  expiryDate,
  setExpiryDate,
  selectedFile,
  handleFileChange,
}: CertificateFormFieldsProps) => {
  return (
    <>
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
              onSelect={(date) => {
                setIssueDate(date);
              }}
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
              onSelect={(date) => {
                setExpiryDate(date);
              }}
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
    </>
  );
};