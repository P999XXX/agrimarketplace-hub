import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CertificateUploadFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormData {
  name: string;
  category: string;
  description?: string;
  expiry_date: Date;
}

const categories = [
  "Organic",
  "Fair Trade",
  "Quality Control",
  "Food Safety",
  "Other",
];

export const CertificateUploadForm = ({
  onSuccess,
  onCancel,
}: CertificateUploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('certificates')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the user's profile for company_id
      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .single();

      if (!profile?.company_id) throw new Error('No company ID found');

      // Create certificate record in database
      const { error: dbError } = await supabase
        .from('certificates')
        .insert({
          name: data.name,
          category: data.category,
          description: data.description,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          company_id: profile.company_id,
          expiry_date: data.expiry_date.toISOString(),
        });

      if (dbError) throw dbError;

      toast({
        title: "Certificate uploaded",
        description: "Your certificate has been uploaded successfully",
      });

      onSuccess?.();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your certificate",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Certificate Name</Label>
          <Input
            id="name"
            {...register("name", { required: "Certificate name is required" })}
            className="mt-1.5"
            placeholder="Enter certificate name"
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value) => setValue("category", value)}
            defaultValue={watch("category")}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            {...register("description")}
            className="mt-1.5"
            placeholder="Enter certificate description"
          />
        </div>

        <div>
          <Label htmlFor="expiry_date">Expiry Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full mt-1.5 justify-start text-left font-normal",
                  !watch("expiry_date") && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {watch("expiry_date") ? (
                  format(watch("expiry_date"), "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={watch("expiry_date")}
                onSelect={(date) => setValue("expiry_date", date as Date)}
                disabled={(date) =>
                  date < new Date() || date > new Date("2100-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="file">Certificate File</Label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="mt-1.5"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Accepted formats: PDF, DOC, DOCX, JPG, PNG (max 10MB)
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload Certificate"
          )}
        </Button>
      </div>
    </form>
  );
};