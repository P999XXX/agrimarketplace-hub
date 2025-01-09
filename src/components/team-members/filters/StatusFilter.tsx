import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger 
        className={`
          ${isMobile ? 'w-full' : 'w-[180px]'} 
          ${!isMobile ? 'shadow-sm border' : 'border-0'} 
          focus:ring-0 focus-visible:ring-0 
          focus:outline-none focus-visible:outline-none
          bg-background hover:bg-accent transition-colors
        `}
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <SelectValue placeholder="Filter by status" />
        </div>
      </SelectTrigger>
      <SelectContent 
        className="z-[100] bg-popover min-w-[180px]" 
        sideOffset={8}
      >
        <SelectItem value="all">All status</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="accepted">Accepted</SelectItem>
        <SelectItem value="declined">Declined</SelectItem>
      </SelectContent>
    </Select>
  );
};