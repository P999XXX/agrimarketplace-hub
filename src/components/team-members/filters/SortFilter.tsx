import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface SortFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortFilter = ({ value, onChange }: SortFilterProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`${isMobile ? 'w-full' : 'w-[180px]'} ${!isMobile ? 'shadow-sm border' : 'border-0'} focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none`}>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" />
          <SelectValue placeholder="Sort by" />
        </div>
      </SelectTrigger>
      <SelectContent className="z-[100]">
        <SelectItem value="created_at-desc">Newest first</SelectItem>
        <SelectItem value="created_at-asc">Oldest first</SelectItem>
        <SelectItem value="name-asc">Name A-Z</SelectItem>
        <SelectItem value="name-desc">Name Z-A</SelectItem>
      </SelectContent>
    </Select>
  );
};