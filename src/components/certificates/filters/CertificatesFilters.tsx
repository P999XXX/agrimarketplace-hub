import { SearchInput } from "./SearchInput";
import { FilterButtons } from "./FilterButtons";
import { MobileFilterMenu } from "./MobileFilterMenu";

interface CertificatesFiltersProps {
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onExportCSV: () => void;
  isMobile: boolean;
}

export const CertificatesFilters = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  onExportCSV,
  isMobile,
}: CertificatesFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-2">
        <FilterButtons
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onExportCSV={onExportCSV}
          searchQuery={searchQuery}
          showViewToggle={!isMobile}
        />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <MobileFilterMenu
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onExportCSV={onExportCSV}
          searchQuery={searchQuery}
          showViewToggle={false}
        />
      </div>
    </div>
  );
};