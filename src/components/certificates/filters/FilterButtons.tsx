import { Filter } from "lucide-react";
import { CommonFilterButtons } from "@/components/common/filters/CommonFilterButtons";

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
  const filters = [
    {
      icon: <Filter className="h-4 w-4 mr-2" />,
      label: "Category",
      value: categoryFilter,
      onChange: setCategoryFilter,
      options: [
        { value: "all", label: "All Categories" },
        { value: "organic", label: "Organic" },
        { value: "quality", label: "Quality" },
        { value: "safety", label: "Safety" },
      ],
    },
    {
      icon: <Filter className="h-4 w-4 mr-2" />,
      label: "Status",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: "all", label: "All Status" },
        { value: "valid", label: "Valid" },
        { value: "expired", label: "Expired" },
      ],
    },
    {
      icon: <Filter className="h-4 w-4 mr-2" />,
      label: "Sort",
      value: sortBy,
      onChange: setSortBy,
      options: [
        { value: "name-asc", label: "Name (A-Z)" },
        { value: "name-desc", label: "Name (Z-A)" },
        { value: "date-asc", label: "Date (Oldest)" },
        { value: "date-desc", label: "Date (Newest)" },
      ],
    },
  ];

  return (
    <CommonFilterButtons
      filters={filters}
      viewMode={viewMode}
      setViewMode={setViewMode}
      onExport={onExportCSV}
      showViewToggle={showViewToggle}
    />
  );
};