import { SearchInput } from "./SearchInput";
import { FilterButtons } from "./FilterButtons";
import { CommonMobileFilterPopover } from "@/components/common/filters/CommonMobileFilterPopover";

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
  const categoryGroups = [
    {
      label: "Certificate Types",
      options: [
        { label: "All Categories", value: "all" },
        { label: "Organic", value: "organic" },
        { label: "Quality", value: "quality" },
        { label: "Safety", value: "safety" },
      ],
    },
  ];

  const statusGroups = [
    {
      label: "Certificate Status",
      options: [
        { label: "All Status", value: "all" },
        { label: "Valid", value: "valid" },
        { label: "Expired", value: "expired" },
      ],
    },
  ];

  const sortGroups = [
    {
      label: "Sort by Name",
      options: [
        { label: "Name (A-Z)", value: "name-asc" },
        { label: "Name (Z-A)", value: "name-desc" },
      ],
    },
    {
      label: "Sort by Date",
      options: [
        { label: "Date (Newest)", value: "date-desc" },
        { label: "Date (Oldest)", value: "date-asc" },
      ],
    },
  ];

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
        <CommonMobileFilterPopover
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categoryGroups={categoryGroups}
          statusGroups={statusGroups}
          sortGroups={sortGroups}
        />
      </div>
    </div>
  );
};