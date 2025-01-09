import { CommonSearchInput } from "@/components/common/filters/CommonSearchInput";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchInput = ({ searchQuery, setSearchQuery }: SearchInputProps) => {
  return (
    <CommonSearchInput 
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery}
      placeholder="Search certificates..."
    />
  );
};