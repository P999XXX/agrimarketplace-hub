import { FilterDropdown } from "@/components/common/filters/FilterDropdown";
import { Grid, Download, Table as TableIcon, Filter } from "lucide-react";
import { CommonMobileFilterButtons } from "@/components/common/filters/CommonMobileFilterButtons";

interface MobileFilterMenuProps {
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
  showViewToggle: boolean;
}

export const MobileFilterMenu = ({
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onExportCSV,
  showViewToggle,
}: MobileFilterMenuProps) => {
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
    <div className="flex flex-col gap-2">
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
    </div>
  );
};