import { CommonSearchInput } from "@/components/common/filters/CommonSearchInput";
import { CommonFilterButtons } from "@/components/common/filters/CommonFilterButtons";
import { CommonMobileFilterDropdown } from "@/components/common/filters/CommonMobileFilterDropdown";
import { Filter } from "lucide-react";

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
  const filterGroups = [
    {
      label: "Category",
      value: categoryFilter,
      onChange: setCategoryFilter,
      options: [
        { label: "All Categories", value: "all" },
        { label: "Organic", value: "organic" },
        { label: "Quality", value: "quality" },
        { label: "Safety", value: "safety" },
      ],
    },
    {
      label: "Status",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { label: "All Status", value: "all" },
        { label: "Valid", value: "valid" },
        { label: "Expired", value: "expired" },
      ],
    },
    {
      label: "Sort",
      value: sortBy,
      onChange: setSortBy,
      options: [
        { label: "Name (A-Z)", value: "name-asc" },
        { label: "Name (Z-A)", value: "name-desc" },
        { label: "Date (Newest)", value: "date-desc" },
        { label: "Date (Oldest)", value: "date-asc" },
      ],
    },
  ];

  const filters = filterGroups.map(group => ({
    icon: <Filter className="h-4 w-4" />,
    label: group.label,
    value: group.value,
    onChange: group.onChange,
    options: group.options,
  }));

  return (
    <div className="flex items-center gap-4">
      <CommonSearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search certificates..."
      />
      <div className="hidden md:flex items-center gap-2">
        <CommonFilterButtons
          filters={filters}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onExport={onExportCSV}
        />
      </div>
      <div className="md:hidden">
        <CommonMobileFilterDropdown
          groups={filterGroups}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onExport={onExportCSV}
        />
      </div>
    </div>
  );
};