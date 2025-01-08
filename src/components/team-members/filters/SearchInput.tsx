import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchInput = ({ searchQuery, setSearchQuery }: SearchInputProps) => {
  return (
    <div className="flex-1 min-w-[200px] relative">
      <Input
        placeholder="Search team members..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-10 shadow-sm pl-10"
      />
      <Search className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
    </div>
  );
};