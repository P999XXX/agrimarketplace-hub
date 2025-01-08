import { SearchInput } from "./filters/SearchInput";
import { FilterButtons } from "./filters/FilterButtons";
import { MobileFilterMenu } from "./filters/MobileFilterMenu";

interface TeamMembersFiltersProps {
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onExportCSV: () => void;
}

export const TeamMembersFilters = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
  onExportCSV,
}: TeamMembersFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-2">
        <FilterButtons
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onExportCSV={onExportCSV}
          searchQuery={searchQuery}
        />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <MobileFilterMenu
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onExportCSV={onExportCSV}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};