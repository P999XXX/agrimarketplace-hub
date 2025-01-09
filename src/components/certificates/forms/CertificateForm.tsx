import { useState } from "react";
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
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const CertificateForm = () => {
  const [date, setDate] = useState<Date>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <form className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Certificate Name</Label>
        <Input id="name" placeholder="Enter certificate name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="organic">Organic</SelectItem>
            <SelectItem value="quality">Quality</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter certificate description"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label>Expiry Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Upload Certificate</Label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => document.getElementById("file")?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            {selectedFile ? selectedFile.name : "Select file"}
          </Button>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button type="submit">Add Certificate</Button>
      </div>
    </form>
  );
};