import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface RoleFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const RoleFilter = ({ value, onChange }: RoleFilterProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-[180px] ${!isMobile ? 'shadow-sm' : ''} focus:ring-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none ${!isMobile ? 'border' : 'border-0'}`}>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <SelectValue placeholder="Filter by role" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All roles</SelectItem>
        <SelectItem value="member">Member</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  );
};