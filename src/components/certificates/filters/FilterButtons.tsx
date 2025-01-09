import { Filter, ChevronDown } from "lucide-react";
import { ViewToggle } from "@/components/common/views/ViewToggle";
import { ExportButton } from "@/components/common/actions/ExportButton";
import { FilterDropdown } from "@/components/common/filters/FilterDropdown";

interface FilterButtonsProps {
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "table";
  setViewMode: (mode: "grid" | "table") => void;
  onExportCSV: () => void;
  searchQuery: string;
  showViewToggle?: boolean;
}

export const FilterButtons = ({
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onExportCSV,
  showViewToggle = true,
}: FilterButtonsProps) => {
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
    <div className="flex items-center gap-2">
      <FilterDropdown
        label="Category"
        icon={<Filter className="h-4 w-4" />}
        value={categoryFilter}
        groups={categoryGroups}
        onChange={setCategoryFilter}
      />

      <FilterDropdown
        label="Status"
        icon={<Filter className="h-4 w-4" />}
        value={statusFilter}
        groups={statusGroups}
        onChange={setStatusFilter}
      />

      <FilterDropdown
        label="Sort"
        icon={<Filter className="h-4 w-4" />}
        value={sortBy}
        groups={sortGroups}
        onChange={setSortBy}
      />

      {showViewToggle && (
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      )}

      <ExportButton onExport={onExportCSV} />
    </div>
  );
};