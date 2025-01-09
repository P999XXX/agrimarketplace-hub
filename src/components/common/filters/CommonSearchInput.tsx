import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CommonSearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

export const CommonSearchInput = ({ 
  searchQuery, 
  setSearchQuery,
  placeholder = "Search..." 
}: CommonSearchInputProps) => {
  return (
    <div className="relative flex-1 w-full">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 h-10 shadow-sm w-full"
      />
    </div>
  );
};