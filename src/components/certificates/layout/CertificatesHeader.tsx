import { ViewMode } from "../types";
import { CertificatesFilters } from "../filters/CertificatesFilters";
import { ActiveFiltersChips } from "../filters/ActiveFiltersChips";

interface CertificatesHeaderProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
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
  hasActiveFilters: boolean;
}

export const CertificatesHeader = ({
  view,
  onViewChange,
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
  hasActiveFilters,
}: CertificatesHeaderProps) => {
  return (
    <div className="space-y-4">
      <CertificatesFilters
        viewMode={view}
        setViewMode={onViewChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onExportCSV={onExportCSV}
        isMobile={isMobile}
      />

      {hasActiveFilters && (
        <ActiveFiltersChips
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}
    </div>
  );
};